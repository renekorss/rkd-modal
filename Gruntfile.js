module.exports = function(grunt) {
  'use strict';

  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Init config
  grunt.initConfig({
    // Removes old files.
    clean: ['dist'],

    // Copys the files from the src folder to the dist folder.
    copy: {
      js: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: '**.js',
            dest: 'dist/'
          }
        ]
      },
    },

    // Minifies the javascript files.
    uglify: {
      build: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: [
            '*.js',
            '!*.min.js'
          ],
          dest: 'dist/',
          ext: '.min.js'
        }]
      }
    },

    // Compiles the stylesheet files.
    sass: {
      build: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: '*.scss',
          dest: 'dist/',
          ext: '.css'
        }]
      }
    },

    // Minifies the stylesheet files.
    cssmin: {
      build: {
        expand: true,
        cwd: 'dist/',
        src: [
          '*.css',
          '!*.min.css'
        ],
        dest: 'dist/',
        ext: '.min.css'
      }
    },

    // Lints JS files for errors
    jshint: {
      build: {
        files: {
          src: ['src/**/*.js']
        }
      }
    },

    // Lints SASS files for errors
    sasslint: {
      build: ['src/**/*.scss'],
    },

    // Watches the project for changes and recompiles the output files.
    watch: {

      javascript: {
        files: 'src/**/*.js',
        tasks: ['jshint:build', 'copy:js', 'uglify:build']
      },

      sass: {
        files: 'src/**/*.scss',
        tasks: ['sasslint:build', 'sass:build', 'cssmin:build']
      },

    }
  });

  // Default taks
  grunt.registerTask('default', ['clean', 'copy', 'uglify', 'sasslint', 'sass', 'cssmin']);
};
