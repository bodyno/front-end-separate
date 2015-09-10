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

        postcss: require('./config/grunt/postcss'),

        uglify: require('./config/grunt/uglify'),

        cssmin: require('./config/grunt/cssmin'),

        useminPrepare: require('./config/grunt/usemin-prepare'),

        usemin: require('./config/grunt/usemin')(),

        sprite: require('./config/grunt/sprite'),

        filerev: require('./config/grunt/filerev'),

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
        'copy:local',
        'copy:image',
        'useminPrepare',
        'less',
        'postcss',
        'concat',
        'uglify',
        'cssmin',
        'filerev',
        'copy:vm',
        'usemin',
        'clean:tmp',
        'clean:svn'
    ]);

    // 注册Grunt默认任务
    grunt.registerTask('default', [
        'nodemon'
    ]);
};
