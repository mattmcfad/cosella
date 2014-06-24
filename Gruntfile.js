var path = require('path');

var stylesheetsDir = 'dev/styles/';

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					port: 9000, //run on port 9000
					base: 'dist/',
					open: true //open browser					
				}
			}
		},
		//lint my jS
		jshint: {
			all: ['dev/javascript/*.js']
		},
		//minify JS 
		uglify: {
			options: {
				mangle: false
			},
			js: {
				files: { // dest : src
					'dist/scripts/main.min.js' : ['dev/javascript/main.js']
				}
			}
		},
		//compile Jade
		jade: {
			html: {
				files: {
					'dist/' : ['dev/templates/*.jade']
				},
				options: {
					client: false,
					wrap: false
				}
			}
		},
		//compile Sass
		sass: { // Task                              
			dist: { // Target  
				options: { // Target options
					style: 'expanded'
				},
				files: {   // Dictionary of files
					'dist/css/main.css': stylesheetsDir + 'main.scss'       // 'destination': 'source
				}
			}
		},
		//autoprefix CSS
		autoprefixer: {
			options: {
				cascade: true
			},
			single_file: {
				src: 'dist/css/main.css'
			}
		},
		//watch file changes and recompile if necessary
		watch: {
			css: {//task
			    files: 'dev/**/*.scss', //where to watch
			    tasks: ['sass','autoprefixer'], 
			    options: {
			      livereload: true
			    }
			},
			jade: {
				files: ['dev/templates/*.jade','dev/templates/includes/*.jade'],
				tasks: ['jade'],
				options: {
					livereload: true
				}
			},
			javascript: {
				files: ['dev/javascript/*.js'],
				tasks: ['jshint','uglify:js'],
				options: {
					livereload: true
				}
			}
		}
	});

//uglify, concat, minify needed.
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//default task grunt will run...
	grunt.registerTask('default', ['jshint','uglify','jade','connect','sass','autoprefixer','watch']);

};