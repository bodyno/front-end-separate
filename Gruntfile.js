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

        sass: require('./config/grunt/sass'),

        postcss: require('./config/grunt/postcss'),

        uglify: require('./config/grunt/uglify'),

        cssmin: require('./config/grunt/cssmin'),

        useminPrepare: require('./config/grunt/usemin-prepare'),

        usemin: require('./config/grunt/usemin')(),

        sprite: require('./config/grunt/sprite'),

        filerev: require('./config/grunt/filerev'),

        nodemon: require('./config/grunt/nodemon')(),

        coffee: require('./config/grunt/coffee'),

        concurrent: require('./config/grunt/concurrent'),

        compress: require('./config/grunt/compress'),

        htmlclean: require('./config/grunt/htmlclean')

    };

    //加载grunt
    grunt.initConfig(config);

    // 注册代码编译任务
    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:copy',
        'useminPrepare',
        'sass:build',
        'postcss',
        'concat',
        'uglify',
        'cssmin',
        'filerev',
        'copy:vm',
        'usemin',
        'htmlclean',
        'concurrent:clean',
        'compress'
    ]);

    // 注册Grunt默认任务
    grunt.registerTask('default', [
        'nodemon'
    ]);
};
