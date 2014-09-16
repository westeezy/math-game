'use strict';

var paths = {
    js: ['!public/system/**/*.js', 'public/js/**/*.js', 'public/js/*.js', 'test/*.js', 'test/**/*.js', '!/node_modules/**'],
    html: [],
    css: []
};


module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: {
                src: ['public/app/**/*.js', 'public/js/*.js', 'public/js/*.js', 'test/**/*.js', 'test/*.js', 'routes/*.js', 'public/js/app/app.js'],
                options: {
                    jshintrc: true
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['Chrome'],
                reporters: ['progress']
            },
            travis: {
                configFile: 'karma.conf.js'
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'Nyan'
                },
                src: ['test/*.js'],
            },
            travis: {
                src: ['test/*.js'],
            }
        },


        protractor: {
            options: {
                keepAlive: true,
                singleRun: false,
                configFile: "protractor_conf.js"
            },
            run: {}
        }


    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-protractor-runner');

    // Default task(s).
    grunt.registerTask('test', ['jshint', 'mochaTest:travis', 'karma:travis']);
    grunt.registerTask('default', ['jshint', 'mochaTest:test', 'karma:unit', 'protractor:run']);

};