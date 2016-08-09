module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      once: {
        src: 'js/index.js',
        dest: 'js/index-browserified.js',
        options: {
          transform: [["babelify",
            {
              "presets": ["es2015"]
            }
          ]]
        }
      },
      watch: {
        src: 'js/index.js',
        dest: 'js/index-browserified.js',
        options: {
          transform: [["babelify",
            {
              "presets": ["es2015"]
            }
          ]],
          watch: true,
          keepAlive: true
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      once: {
        files: {
          'js/index-browserified.js': ['js/index-browserified.js']
        }
      }
    }

  });

  grunt.registerTask('default', [
    'browserify:once',
    'uglify:once'
  ]);

};