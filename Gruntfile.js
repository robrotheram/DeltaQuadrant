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
    grunt.registerTask('default', ['uglify']);


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
            // if any .less file changes in directory "public/css/" run the "less"-task.
            files: ["app/**/*","Gruntfile.js","bower.json"],
            tasks: ["clean",'jshint',"useminPrepare","copy","concat","less","uglify"]
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
                ],
            },
        },
        jshint: {
            options: {
                curly: false,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                laxbreak:true,
                browser: true,
                expr: true,
                globals: {
                    console: false,
                    angular: false,
                    io: false,
                    $: false,
                    TweenLite: false,
                    TimelineLite: false,
                    TweenMax: false,
                    TimelineMax: false,
                    Linear: false,
                    Power0: false,
                    Power1: false,
                    Power2: false,
                    Power3: false,
                    Power4: false,
                    d3: false,
                    enableModalView: false,
                    healthStatus: false,
                    showMetricUpdateAnimation: false,
                    Constants: true,
                    Clipboard: false,
                    jsPlumb: false,
                    alert: false
                }
            },
            files: ['Gruntfile.js', 'app/js/**']
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
    });
    grunt.registerTask('default', ['less','watch']);
    grunt.loadNpmTasks('grunt-contrib-uglify'); // load the given tasks
};