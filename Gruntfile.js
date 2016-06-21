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


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        useminPrepare: {
            options: {
                cwd:'app',
                dest: 'public'
            },
            html: 'app/index.html'
        },
        usemin: {
            options: {
                dirs: ['public']
            },
            html: ['public/{,*/}*.html'],
           // css: ['dist/styles/{,*/}*.css']
        },
        watch: {
            files: ["app/**/*","Gruntfile.js","bower.json"],
            tasks: ["clean","useminPrepare","copy","concat","less","uglify","usemin"]
        },
        // "less"-task configuration
        clean: ['public'],
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'app/', src: ['views/**'], dest: 'public/'},
                    {expand: true, cwd: 'app/', src: ['img/**'], dest: 'public/'},
                    {expand: true, cwd: 'app/', src: ['css/**'], dest: 'public/'},
                    //{expand: true, cwd: 'app/', src: ['js/**'], dest: 'public/'},
                    {expand: true, cwd: 'app/', src: ['*.html'], dest: 'public/'},
                    {expand: true, cwd: 'app/components/bootstrap/fonts', src: ['*'], dest: 'public/fonts'},
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
                    paths: ["public/css/"],
                },
                files: [
                    // compilation.css  :  source.less
                    {"public/css/bootstrap.css": "app/less/bootstrap/bootstrap.less"},
                    {"public/css/style.css": "app/less/custom/style.less"},
                ],
            }
        },
        concurrent: {
          dev: {
            tasks: ['nodemon', 'watch'],
            options: {
              logConcurrentOutput: true
            }
          }
      },
        nodemon: {
          dev: {
            script: './bin/www',
            options: {
              args: ['dev'],
              nodeArgs: ['--debug'],
              callback: function (nodemon) {
                nodemon.on('log', function (event) {
                  console.log(event.colour);
                });
              },
              env: {
                PORT: '8181'
              },
              cwd: __dirname,
              ignore: ['node_modules/**'],
              ext: 'js,coffee',
              watch: ['**'],
              delay: 1000,
              legacyWatch: true
            }
          },
          exec: {
            options: {
              exec: 'less'
            }
          }
        }
    });
    grunt.registerTask('default', ['concurrent']);
    grunt.loadNpmTasks('grunt-contrib-uglify'); // load the given tasks
};
