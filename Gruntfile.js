module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			src: ['Gruntfile.js', 'features/**/*.js', 'model/**.js']
		},
		cucumberjs: {
			options: {
				format: 'pretty'
			},
			features : []
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-cucumberjs');
	
	grunt.registerTask('default', ['jshint', 'cucumberjs']);

};