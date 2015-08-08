'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    // 加载项目配置
    var configApp = require('./config/app');
    // 路径配置

    var appConfig = configApp.path;

    // Grunt configuration

    var config = {

    // 路径配置
    yo: appConfig,

    /**
     * Clean files and folders.
     */
    clean: require('./config/grunt/clean'),


    /**
     * Copy files and folders.
     */
    copy: require('./config/grunt/copy'),

    // r.js打包配置
    //requirejs: require('./config/grunt/requirejs')(grunt),

    /**
     * Compile LESS files to CSS.
     */
    less: require('./config/grunt/less'),

    /**
     * Parse CSS and add prefixed properties and values by Can I Use database
     * for actual browsers. Based on Autoprefixer.
     */
    autoprefixer: require('./config/grunt/autoprefixer'),

    /**
     * Minify files with UglifyJS.
     */
    uglify: require('./config/grunt/uglify'),

    /**
     * Compress CSS files.
     */
    cssmin: require('./config/grunt/cssmin'),

    /**
     * prepares the configuration to transform specific blocks in the scrutinized file into a single line,
     * targeting an optimized version of the files.
     * This is done by generating subtasks called generated for every
     * optimization steps handled by the Grunt plugins listed below.
     */
    useminPrepare: require('./config/grunt/usemin-prepare'),

    /**
     * Replaces references from non-optimized scripts, stylesheets and other assets
     * to their optimized version within a set of HTML files (or any templates/views).
     * homepage: https://github.com/yeoman/grunt-usemin
     */
    usemin: require('./config/grunt/usemin')(),

    /**
     * Converting a set of images into a spritesheet
     * and corresponding CSS variables.
     */
    sprite: require('./config/grunt/sprite'),

    /**
     * Static file asset revisioning through content hashing
     */
    rev: require('./config/grunt/rev'),

    nodemon: require('./config/grunt/nodemon')

    };

    // The initialization of Grunt configuration parameters
    grunt.initConfig(config);

    // 注册代码编译任务
    grunt.registerTask('build', [
        'clean:dist',
        'copy:css',
        'copy:js',
        'copy:plugin',
        'copy:others',
        'copy:image',
        'useminPrepare',
        'less:dist',
        'autoprefixer:dist',
        'concat',
        'uglify',
        'cssmin',
        'rev:dist',
        'copy:vm',
        'usemin',
    ]);
    // 注册Grunt默认任务
    grunt.registerTask('build', [
        'build'
    ]);

    grunt.registerTask('default', [
        'nodemon'
    ]);
};
