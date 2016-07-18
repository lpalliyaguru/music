/*jslint node: true */
"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            bower: {
                install: {
                    options: {
                        install: true,
                        copy: false,
                        targetDir: './libs',
                        cleanTargetDir: true
                    }
                }
            },

            //Enable this for libsass compiler
            sass: {
                options: {
                    sourceMap: true
                },
                dist: {
                    files: {
                        'styles/styles.css': 'styles/styles.scss',
                    }
                }
            },
            copy: {
                main: {
                    files: [
                        {
                            //for jquery files
                            expand: true,
                            dot: true,
                            cwd: 'bower_components/jquery/dist',
                            src: ['jquery.min.js', 'jquery.min.map'],
                            dest: 'dist/js'
                        },
                        {
                            //for bootstrap fonts
                            expand: true,
                            dot: true,
                            cwd: 'bower_components/bootstrap/dist',
                            src: ['fonts/*.*'],
                            dest: 'dist'
                        },
                        {
                            //for bootstrap fonts
                            expand: true,
                            dot: true,
                            cwd: 'bower_components/angular-resource/',
                            src: ['angular-resource.min.js', 'angular-resource.min.js.map'],
                            dest: 'dist/js'
                        },
                        {
                            //for Fontawesome stylesheet files
                            expand: true,
                            dot: true,
                            cwd: 'bower_components/fontawesome/css',
                            src: ['font-awesome.min.css'],
                            dest: 'dist/css'
                        },
                        {
                            //for Bootstrap stylesheet files
                            expand: true,
                            dot: true,
                            cwd: 'bower_components/bootstrap/dist/css',
                            src: ['bootstrap.min.css'],
                            dest: 'dist/css'
                        },
                        {
                            //for Bootstrap theme stylesheet files
                            expand: true,
                            dot: true,
                            cwd: 'bower_components/bootstrap/dist/css',
                            src: ['bootstrap-theme.min.css'],
                            dest: 'dist/css'
                        },
                        {
                            //for dripicons fonts
                            expand: true,
                            dot: true,
                            cwd: 'bower_components/dripicons',
                            src: ['fonts/*.*'],
                            dest: 'dist'
                        },
                        {
                            //for weather fonts
                            expand: true,
                            dot: true,
                            cwd: 'bower_components/weather-icons',
                            src: ['font/*.*'],
                            dest: 'dist'
                        },
                        {
                            //for font-awesome
                            expand: true,
                            dot: true,
                            cwd: 'bower_components/fontawesome',
                            src: ['fonts/*.*'],
                            dest: 'dist'
                        },
                        {
                            //for theme music fonts
                            expand: true,
                            dot: true,
                            cwd: 'fonts',
                            src: ['*.*'],
                            dest: 'dist/fonts'
                        },
                        {
                            //for Images
                            expand: true,
                            dot: true,
                            cwd: 'images',
                            src: ['*.*', '*/*'],
                            dest: 'dist/images'
                        },
                        {
                            //for services data
                            expand: true,
                            dot: true,
                            cwd: 'app/data',
                            src: ['*.*'],
                            dest: 'dist/data'
                        },
                        {
                            //for Underscore source map
                            expand: true,
                            dot: true,
                            cwd: 'bower_components/underscore',
                            src: ['*.map'],
                            dest: 'dist/js'
                        },
                        {
                            //for Angular source map
                            expand: true,
                            dot: true,
                            cwd: 'bower_components/angular',
                            src: ['*.map'],
                            dest: 'dist/js'
                        },
                        {
                            expand: true,
                            dot: true,
                            src: ['*.map'],
                            dest: 'dist/js'
                        },
                        {
                            expand: true,
                            dot: true,
                            src: ['*.map'],
                            dest: 'dist/js'
                        },
                        {
                            expand: true,
                            dot:true,
                            cwd: "views",
                            src: ['*', '**'],
                            dest: 'dist/views'
                        }
                    ]

                }
            },

            uglify: {
                dist: {
                    files: {
                        'dist/js/app.js': ['dist/js/app.js']
                    },
                    options: {
                        mangle: false,
                        preserveComments: 'some'
                    }
                }
            },
            cssmin: {
                combine: {
                    files: {
                        'dist/css/main.css': [
                            'bower_components/dripicons/css/dripicons.css',
                            'bower_components/weather-icons/css/weather-icons.min.css',
                            'bower_components/angular-toastr/dist/angular-toastr.min.css',
                            'bower_components/ladda/dist/ladda-themeless.min.css',
                            'styles/fonts/music-icons/music-icons.css',
                            'styles/styles.css',
                            'styles/app.css'
                        ]
                    }
                },
                add_banner: {
                    options: {
                        banner: '/* My minified admin css file */'
                    },
                    files: {
                        'dist/css/main.css': ['dist/css/main.css']
                    }
                }
            },

            html2js: {
                dist: {
                    src: ['app/views/*.html', 'app/views/charts/*.html', 'app/views/forms/*.html', 'app/views/mail/*.html', 'app/views/maps/*.html', 'app/views/pages/*.html', 'app/views/tables/*.html', 'app/views/tables/*.html', 'app/views/tasks/*.html', 'app/views/ui_elements/*.html'],
                    dest: 'tmp/views.js'
                }
            },
            aws: grunt.file.readJSON('aws-credentials.json'),
            clean: {
                temp: {
                    src: ['tmp']
                }
            },

            concat: {
                options: {
                    stripBanners: true,
                    sourceMap: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                dist: {
                    src: [
                        'bower_components/bootstrap/dist/js/bootstrap.min.js',
                        'scripts/gmap.js',
                        'bower_components/slimScroll/jquery.slimscroll.min.js',
                        'bower_components/angular/angular.min.js',
                        'bower_components/angular-animate/angular-animate.min.js',
                        'bower_components/angular-route/angular-route.min.js',
                        'bower_components/angular-sanitize/angular-sanitize.min.js',
                        'bower_components/angular-wizard/dist/angular-wizard.min.js',
                        'bower_components/angular-ui-tree/dist/angular-ui-tree.js',
                        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                        'bower_components/angular-media-player/dist/angular-media-player.min.js',
                        'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
                        'bower_components/ngstorage/ngStorage.min.js',
                        'bower_components/raphael/raphael-min.js',
                        'bower_components/underscore/underscore-min.js',
                        'bower_components/angular-resource/angular-resource.min.js',
                        'bower_components/jqvmap/dist/jquery.vmap.min.js',
                        'bower_components/angular-scroll/angular-scroll.min.js',
                        'bower_components/html5shiv/dist/html5shiv.min.js',
                        'bower_components/ladda/dist/spin.min.js',
                        'bower_components/ladda/dist/ladda.min.js',
                        'bower_components/angular-ladda/dist/angular-ladda.min.js',
                        'scripts/angular-dragdrop.js',
                        'scripts/extras.js',
                        'app/*.js'
                    ],
                    dest: 'dist/js/app.js'
                }
            },

            jshint: {
                all: ['Gruntfile.js', 'app/*.js', 'app/**/*.js']
            },

            /*connect: {
             server: {
             options: {
             hostname: 'localhost',
             port: 8888
             }
             }
             },*/

            watch: {
                dev: {
                    files: ['Gruntfile.js', 'app/*.js', '*.html', 'styles/*.scss'],
                    tasks: ['jshint', 'html2js:dist', 'sass', 'copy:main', 'concat:dist', 'clean:temp', 'cssmin'],
                    options: {
                        atBegin: true
                    }
                },
                min: {
                    files: ['Gruntfile.js', 'app/*.js', '*.html', 'styles/*.scss'],
                    tasks: ['jshint', 'html2js:dist', 'sass', 'copy:main', 'concat:dist', 'clean:temp', 'uglify:dist', 'cssmin'],
                    options: {
                        atBegin: true
                    }
                }
            },

            compress: {
                dist: {
                    options: {
                        archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                    },
                    files: [{
                        src: ['index.html'],
                        dest: '/'
                    }, {
                        src: ['app/**'],
                        dest: 'app/'
                    }, {
                        src: ['app/**'],
                        dest: 'app/'
                    }, {
                        src: ['app/**'],
                        dest: 'app/'
                    }]
                }
            },
            aws_s3: {
                options : {
                    accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
                    secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
                    region: 'eu-west-1',
                    uploadConcurrency: 5, // 5 simultaneous uploads
                    downloadConcurrency: 5
                },
                production: {
                    options: {
                        bucket: '<%= aws.bucket %>',
                        region: '<%= aws.region %>',
                        //params: {
                         //   ContentEncoding: 'gzip' // applies to all the files!
                        //},
                       // mime: {
                        //    'dist/assets/production/LICENCE': 'text/plain'
                       // }
                    },
                    files: [
                        {expand: true, cwd: 'dist/', src: ['**'], dest: '/'},
                       // {expand: true, cwd: 'dist/views/', src: ['**'], dest:     'views/'},
                        //{expand: true, cwd: 'dist/css', src: ['**'], dest: 'css'}, // enable stream to allow large files
                        //{expand: true, cwd: 'assets/prod/', src: ['**'], dest: 'assets/', params: {CacheControl: '2000'}},
                        // CacheControl only applied to the assets folder
                        // LICENCE inside that folder will have ContentType equal to 'text/plain'
                    ]
                },
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    //grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-aws-s3');

   // grunt.registerTask('dev', [ 'bower', 'connect:server', 'watch:dev' ]);
    //grunt.registerTask('test', [ 'bower', 'jshint' ]);
    grunt.registerTask('default', ['copy', 'concat', 'uglify', 'cssmin']);
    //grunt.registerTask('minified', [ 'bower', 'connect:server', 'watch:min' ]);
    ///grunt.registerTask('compress', ['compress']);
    grunt.registerTask('deploy', ['aws_s3']);
};