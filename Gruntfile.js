var fs = require('node-fs-extra');

module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			server: {
				src: ['Gruntfile.js', 
							'server/features/**/*.js',
							'server/server.js',
							'server/routes/**/*.js',
							'server/manager/**/*.js',
							'server/dao/**/*.js',
							'server/util/**/*.js',
							'server/config/**/*.js'
						]
			},
			client: {
				options: {
					extract: 'auto'
				},
				src: ['server/public/index.html', 'server/public/elements/**/*.html', 'server/public/elements/**/*.js']
			}
		},
		cucumberjs: {
			options: {
				format: 'pretty'
			},
			features : ['server/features/*']
		},
		vulcanize: {
			default: {
				options: {
					csp: true,
					excludes: {
						imports: [
							"polymer.html"
						]
					}
				},
				files: {
					'server/public/dist/index.html': 'server/public/index.html'
				},
			}
		},
		'dist-client': {
			default: {}
		},
		shell: {
			runLocalServer: {
				command: 'DEBUG=social-scoreboard* node server/server'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-cucumberjs');
	grunt.loadNpmTasks('grunt-vulcanize');
	
	grunt.registerMultiTask('dist-client', 'Prepare client files to distribution', function() {
		var inDir = './server/public/';
		var outDir = inDir + 'dist/';
		grunt.log.writeln('Removing client/dist directory...');
		var done = this.async();
		fs.remove(outDir, function(err, result) {
			if (err) {
				grunt.log.error(err);
				done(err);
			} else {
				fs.mkdirsSync(outDir);
				grunt.task.run('vulcanize');
				fs.copySync(inDir + 'font', outDir + 'font');
				fs.copySync(inDir + 'img', outDir + 'img');
				fs.copySync(inDir + 'bower_components', outDir + 'bower_components');
				fs.copySync(inDir + 'css', outDir + 'css');
				fs.copySync(inDir + 'elements/point-setter/presenter.js', outDir  + 'elements/point-setter/presenter.js'); //TODO Minify this- Vulvanize can't do it
				done();
			}
		});
	});
	
	grunt.registerTask('server-test', ['jshint:server', 'cucumberjs']);
	
	grunt.loadNpmTasks('grunt-shell');
	
	grunt.registerTask('default', ['jshint:client', 'jshint:server', 'shell:runLocalServer']);

};
