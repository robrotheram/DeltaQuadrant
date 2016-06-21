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
                cwd:'src/client',
                dest: 'src/server/public'
            },
            html: 'src/client/index.html'
        },
        usemin: {
            options: {
                dirs: ['src/server/public']
            },
            html: ['src/server/public/{,*/}*.html'],
           // css: ['dist/styles/{,*/}*.css']
        },
        watch: {
            files: ["src/client/**/*","Gruntfile.js","bower.json"],
            tasks: ["clean","useminPrepare","copy","concat","less","uglify","usemin"]
        },
        // "less"-task configuration
        clean: ['public'],
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/client/', src: ['views/**'], dest: 'src/server/public/'},
                    {expand: true, cwd: 'src/client/', src: ['img/**'], dest: 'src/server/public/'},
                    {expand: true, cwd: 'src/client/', src: ['css/**'], dest: 'src/server/public/'},
                    //{expand: true, cwd: 'app/', src: ['js/**'], dest: 'public/'},
                    {expand: true, cwd: 'src/client/', src: ['*.html'], dest: 'src/server/public/'},
                    {expand: true, cwd: 'src/client/components/bootstrap/fonts', src: ['*'], dest: 'src/server/public/fonts'},
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
              watch: ['src/server'],
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
