var argv = require('yargs')
    .usage('Apiary templating command.\nUsage: $0 -i input -o output')
    .example('$0 -i ./server/api/apiary/pre.apiary.apib -o ./server/api/apiary/apiary.apib', 'compile the template')
    .demand(['i', 'o'])
    .alias('i', 'input')
		.alias('o', 'output')
    .describe('i', 'input file')
    .describe('o', 'output file')
    .argv;
		
var fs = require('fs');
var path = require('path');

var inputFileName = argv.i;
var outputFileName = argv.o;
var includes = [];

function searchIncludes(includes, fileName, contents) {
	var search;
	var includePattern = /!include\((.+)\)/g;
	while ((search = includePattern.exec(contents)) !== null) {
		var includeParams = getIncludeParams(search[1]);
		addFile(includes, path.join(__dirname, includeParams.fileName), {
			index: includePattern.lastIndex,
			fileOwner: fileName,
			stringToReplace: search[0],
			includeParams: includeParams.params
		});
	}
	return includes;
}

function getIncludeParams(match) {
	var fileName = match.replace(/,.+/, ''); 
	var params = match.match(/,(.+)/);
	return {
		fileName: fileName,
		params: params ? JSON.parse(params[1].replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')) : null
	};
}

function getInclude(includes, fileName) {
	for (var i = 0; i < includes.length; i++) {
		if (includes[i].fileName === fileName) {
			return includes[i];
		}
	}

	return null;
}

function addFile(includes, fileName, options) {
	var include = getInclude(includes, fileName);
	if (!include) {
		var input = fs.readFileSync(fileName, 'utf8');
		include = {
			fileName: fileName,
			positions: [],
			output: input
		};
		includes.push(include);
		searchIncludes(includes, fileName, input);
	}
	if (options) {
		include.positions.push(options);
	}
}

function addLineBreaks(string, lineBreaks) {
	
	var result = string;
	if (lineBreaks) {
		for (var i = 0; i < lineBreaks; i++) {
			result = '\n' + result;
		}
	}
	return result;
	
}

function addSpaces(string, numSpaces) {
	
	var result = string;
	var spaces = '';
	if (numSpaces) {
		for (var i = 0; i < numSpaces; i++) {
			spaces += ' ';
		}
		
		result = result.replace(/(^|\n)/g, '\$1' + spaces);
	}
	return result;
}

function render(string, params) {
	var result = string;
	
	if (!params) {
		return result;
	}
	
	result = addLineBreaks(result, params.lineBreaks);
	result = addSpaces(result, params.spaces);
	return result;
}

function replace(includes, replacement, destiny, position) {
	var compiledReplacement = render(replacement.output, position.includeParams);
	
	destiny.output = destiny.output.substring(0, position.index - position.stringToReplace.length) + compiledReplacement + destiny.output.substring(position.index);

	var offset = compiledReplacement.length - position.stringToReplace.length;
	updateIndexes(includes, position.index, offset, destiny);
	
}

function updateIndexes(includes, index, offset, destiny) {
	includes.forEach(function(include) {
		include.positions.forEach(function(position) {
			
			if (destiny.fileName === position.fileOwner && position.index > index) {
				position.index += offset;
			}
		});
	});
}

function replaceAll(includes) {
	includes.slice().reverse().forEach(function(replacement) {
		replacement.positions.forEach(function(position) {
			var destiny = getInclude(includes, position.fileOwner);
			replace(includes, replacement, destiny, position);
		});
	});
}

function writeOutput(includes, outputFileName) {
	var output = includes[0].output;
	console.log('Writing results to ' + outputFileName + ' ...');
	fs.writeFile(outputFileName, output, function(err) {
		if (err) {
			throw err;
		}
		console.log('Done!');
	});
}

addFile(includes, inputFileName);
replaceAll(includes);
writeOutput(includes, outputFileName);