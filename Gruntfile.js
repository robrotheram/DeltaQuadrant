/* jshint node: true */
'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks('grunt-browser-sync');
    //grunt.loadNpmTasks('grunt-contrib-uglify'); // load the given tasks

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      useminPrepare: {
            options: {
                cwd:'src/client',
                dest: 'src/server/public',
                flow: { steps: { js: ['concat'], css: ['concat', 'cssmin'] }, post: {} }
            },
            html: 'src/client/index.html',
        },
        usemin: {
            options: {
                dirs: ['src/server/public']
            },
            html: ['src/server/public/{,*/}*.html'],
           // css: ['dist/styles/{,*/}*.css']
        },
        jshint: {
          files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js',"!src/server/public/**"],
          options: {
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            globals: {
              jQuery: true
            },
          }
        },
        watch: {
            dev:{
              options: {
                livereload: true
              },
              files: ["src/client/**","src/server/**","!src/server/public/**","Gruntfile.js","bower.json"],
              tasks: ["build"]
            },
        },
        // "less"-task configuration
        clean: ['src/server/public'],
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/client/', src: ['views/**'], dest: 'src/server/public/'},
                    {expand: true, cwd: 'src/client/', src: ['img/**'], dest: 'src/server/public/'},
                    {expand: true, cwd: 'src/client/', src: ['css/**'], dest: 'src/server/public/'},
                    //{expand: true, cwd: 'app/', src: ['js/**'], dest: 'public/'},
                    {expand: true, cwd: 'src/client/', src: ['*.html'], dest: 'src/server/public/'},
                    {expand: true, cwd: 'bower_components/bootstrap/fonts', src: ['*'], dest: 'src/server/public/fonts'},
                ],
            },
        },
        uglify: {
          options: {
              report: 'min',
              mangle: false
          }
      },
      less: {
            development: {
                options: {
                    // Specifies directories to scan for @import directives when parsing.
                    // Default value is the directory of the source, which is probably what you want.
                    paths: ["src/server/public/css/"],
                },
                files: [
                    // compilation.css  :  source.less
                    {"src/server/public/css/bootstrap.css": "src/client/less/bootstrap/bootstrap.less"},
                    {"src/server/public/css/style.css": "src/client/less/custom/style.less"},
                ],
            }
      },
      nodemon: {
           dev: {
               script: 'bin/www',
               ignore:  ['node_modules/**','bower_components/**','public/**']
           }
       },
      concurrent: {
           dev: {
               tasks: ['nodemon', 'watch'],
               options: {
                   logConcurrentOutput: true
               }
           }
        }
      });


    // Default task(s).

    grunt.registerTask('server', ['concurrent']);
    grunt.registerTask('build', ["jshint","useminPrepare","copy","concat","less","usemin"]);
};
