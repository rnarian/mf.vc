module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            bower: 'bower_components',
            css: 'assets/css',
            js: 'assets/js',
            images: 'assets/images',
            icons: 'assets/icons'
        },

        // SCSS
        sass: {
            dev: {
                options: {
                    outputStyle: 'compressed',
                    loadPath: '.'
                },
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.scss'
                }
            },
            build: {
                options: {
                    outputStyle: 'compressed',
                    loadPath: '.'
                },
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.scss'
                }
            }
        },

        // CSS autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 9']
            },
            dist: {
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.css'
                }
            }
        },

        // Connect Server
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: ''
                }
            }
        },

        // Concat
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    '<%= dirs.bower %>/jquery/dist/jquery.js',
                    '<%= dirs.bower %>/fastclick/lib/fastclick.js',
                    '<%= dirs.js %>/*.js',
                    '!<%= dirs.js %>/modernizr.js',
                    '!<%= dirs.js %>/build.js'
                ],
                dest: '<%= dirs.js %>/build.js',
            },
        },

        // JShint
        jshint: {
            all: [
                'Gruntfile.js',
                '<%= dirs.js %>/*.js',
                '!<%= dirs.js %>/modernizr.js',
                '!<%= dirs.js %>/build.js'
            ]
        },

        // HTMLhint
        htmlhint: {
            html: {
                options: {
                    'tag-pair': true
                },
                src: ['*.html']
            }
        },

        // Uglify
        uglify: {
            all: {
                files: {
                    '<%= dirs.js %>/build.js': ['<%= dirs.js %>/build.js']
                }
            }
        },

        // Imagemin
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.images %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= dirs.images %>'
                }]
            }
        },

        // Grunticon
        grunticon: {
            icons: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.icons %>',
                    src: ['*.svg', '*.png'],
                    dest: "<%= dirs.icons %>/grunticon"
                }],
                options: {
                    cssprefix: ".icon--",
                    customselectors: {
                      "*": [".icon--$1:before"],
                      "wave": [".button--wave:before"],
                      "wave-light": [".button--pulse-on:before"],
                      "wave-border": [".modal:before"]
                    }
                }
            }
        },

        // modernizr
        modernizr: {
            dist: {

                // Path to save out the built file
                dest: '<%= dirs.js %>/modernizr.js',
                crawl : false,
                uglify: true,
                options : [
                    "html5shiv"
                ],
            }
        },

        // Browser Sync
        browser_sync: {
            dev: {
                bsFiles: {
                    src : 'assets/css/style.css'
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: ""
                    },
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: true,
                        forms: true
                    },
                }
            }
        },

        // Watch
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: ['<%= dirs.css %>/*.scss'],
                tasks: ['sass:dev', 'autoprefixer']
            },
            images: {
                files: ['<%= dirs.images %>/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            icons: {
                files: ['<%= dirs.icons %>/*'],
                tasks: ['grunticon']
            },
            html: {
                files: ['*.html'],
                tasks: ['htmlhint']
            },
            scripts: {
                files: ['Gruntfile.js', '<%= dirs.js %>/*.js'],
                tasks: ['jshint', 'concat', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', ['sass:build', 'autoprefixer', 'concat', 'uglify', 'imagemin', 'modernizr']);
    grunt.registerTask('dev', ['connect', 'watch', 'notify']);
    grunt.registerTask('dev:sync', ['browser_sync', 'watch', 'notify']);
};
