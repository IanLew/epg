module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            options: {
                banner: '/*! <%= pkg.name %>-<%= pkg.version %>.js create by <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */',
                mainConfigFile: 'src/config/config.js',
                baseUrl: 'src',
                findNestedDependencies: true,
                optimize: 'none',
                onModuleBundleComplete: function(data) {
                    var fs = require('fs'),
                        amdclean = require('amdclean'),
                        outputFile = data.path;

                    fs.writeFileSync(outputFile, amdclean.clean({
                        filePath: outputFile,
                        wrap: {
                            start: this.banner + '\n(function(win, doc, undefined) {\n',
                            end: '\nwin.epg = epg;\n})(window, document);'
                        }
                    }));
                },
                include: ['<%= pkg.name %>'],
                out: 'build/epg.js'
            },
            build: {}
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            build: ['Gruntfile.js', 'build/<%= pkg.name %>.js']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>-<%= pkg.version %>.js create by <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */',
                compress: false,
                mangle: true
            },
            build: {
                src: 'build/epg.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            options: {
                spawn: false
            },
            build: {
                files: ['src/modules/**.js', 'src/**.js'],
                tasks: ['jshint', 'requirejs', 'uglify']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['requirejs', 'jshint', 'uglify', 'watch']);
};