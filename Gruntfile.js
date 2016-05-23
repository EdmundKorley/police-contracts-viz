module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Compiles our SCSS to CSS
        sass: {
            options: {
                sourcemap: 'none',
                noCache: true
            },
            dist: {
                files: {
                    'public/main.css': 'stylesheets/master.scss'
                }
            }
        },
        // Do some PostCSS optimizations on our css file
        postcss: {
            options: {
                map: false, // inline sourcemaps
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    }), // add vendor prefixes
                    require('cssnano')({
                        discardComments: {
                            removeAll: true
                        }
                    }) // minify the result
                ]
            },
            dist: {
                src: 'public/*.css'
            }
        },
        // Watch and do transformations upon file changes
        watch: {
            css: {
                files: 'stylesheets/**/*.scss',
                tasks: ['sass', 'postcss']
            }
        }
    });

    // Load the plugin that provides the "sass" and "postcss" tasks.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s)
    grunt.registerTask('default', ['watch']);

};
