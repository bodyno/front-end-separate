'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    // 加载项目配置
    var configApp = require('./config/app');
    // 路径配置

    var appConfig = configApp.path;

    // grunt配置

    var config = {

    // 路径配置
    yo: appConfig,

    clean: require('./config/grunt/clean'),

    copy: require('./config/grunt/copy'),

    less: require('./config/grunt/less'),

    autoprefixer: require('./config/grunt/autoprefixer'),

    uglify: require('./config/grunt/uglify'),

    cssmin: require('./config/grunt/cssmin'),

    useminPrepare: require('./config/grunt/usemin-prepare'),

    usemin: require('./config/grunt/usemin')(),

    sprite: require('./config/grunt/sprite'),

    rev: require('./config/grunt/rev'),

    nodemon: require('./config/grunt/nodemon')

    };

    //加载grunt
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
    grunt.registerTask('default', [
        'nodemon'
    ]);
};
