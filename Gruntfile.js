var fs = require('node-fs-extra');

module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			server: {
				src: ['Gruntfile.js', 'features/**/*.js', 'model/**.js']
			},
			client: {
				options: {
					extract: 'auto'
				},
				src: ['client/index.html', 'client/elements/**/*.html', 'client/elements/**/*.js']
			}
		},
		cucumberjs: {
			options: {
				format: 'pretty'
			},
			features : []
		},
		connect: {
			'client-dev': {
				options: {
					port: 9001,
					base: 'client',
					keepalive: true
				}
			},
			'client-dist': {
				options: {
					port: 9002,
					base: 'client/dist',
					keepalive: true
				}
			}
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
					'client/dist/index.html': 'client/index.html'
				},
			}
		},
		'dist-client': {
			default: {}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-cucumberjs');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-vulcanize');
	
	grunt.registerMultiTask('dist-client', 'Prepare client files to distribution', function() {
		var inDir = './client/';
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
				fs.copySync(inDir + 'bower_components', outDir + 'bower_components');
				fs.copySync(inDir + 'css', outDir + 'css');
				fs.copySync(inDir + 'elements/point-setter/presenter.js', outDir  + 'elements/point-setter/presenter.js'); //TODO Minify this- Vulvanize can't do it
				done();
			}
		});
	});
	
	grunt.registerTask('server-test', ['jshint:server', 'cucumberjs']);
	
	grunt.registerTask('client-dev-run', ['jshint:client', 'connect:client-dev']);
	grunt.registerTask('client-dist-run', ['jshint:client', 'dist-client', 'connect:client-dist']);
	
	grunt.registerTask('default', ['server-test']);

};