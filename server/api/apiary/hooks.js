var hooks = require('hooks');
var before = hooks.before;
var after = hooks.after;

var scoreId;

after("Scores > Scores Collection > Create a Score", function(transaction) {
	try {
		scoreId = transaction.real.body.match(/\"_id\":\"([^}]+)\"/)[1];
	} catch (e) {
		console.log('Error: code not retreived', e);
	}
});

before("Scores > Score > Retrieve a single Score", function(transaction) {
	transaction.request.uri = transaction.request.uri.replace(/\/score\/.+/, '/score/' + scoreId);
	transaction.fullPath = transaction.request.uri;
	transaction.id = 'GET ' + transaction.request.uri;
});


before("Scores > Score > Remove a Score", function(transaction) {
	transaction.request.uri = transaction.request.uri.replace(/\/score\/.+/, '/score/' + scoreId);
	transaction.fullPath = transaction.request.uri;
	transaction.id = 'DELETE ' + transaction.request.uri;
	transaction.expected.body = 'Score[' + scoreId + '] deleted';
});




