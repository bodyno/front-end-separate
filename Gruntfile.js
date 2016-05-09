module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // 加载项目配置
  var configApp = require('./config/config');

  // 路径配置
  var appConfig = configApp.path;

  // grunt配置
  var config = {

    // 路径配置
    yo: appConfig,

    clean: require('./config/grunt/clean'),

    copy: require('./config/grunt/copy'),

    postcss: require('./config/grunt/postcss'),

    cssmin: require('./config/grunt/cssmin'),

    useminPrepare: require('./config/grunt/usemin-prepare'),

    usemin: require('./config/grunt/usemin')(),

    sprite: require('./config/grunt/sprite'),

    filerev: require('./config/grunt/filerev'),

    nodemon: require('./config/grunt/nodemon')(),

    concurrent: require('./config/grunt/concurrent'),

    htmlclean: require('./config/grunt/htmlclean'),

    browserSync: require('./config/grunt/browserSync'),

    cdn: require('./config/grunt/cdn')()

  };

  //加载grunt
  grunt.initConfig(config);

  // 注册代码编译任务
  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:copy',
    'useminPrepare',
    'postcss',
    'concat',
    'uglify',
    'cssmin',
    'filerev',
    'copy:html',
    'usemin',
    'htmlclean',
    'concurrent:clean'
  ]);

  grunt.registerTask('buildCdn', [
    'build',
    'cdn'
  ]);

  // 注册Grunt默认任务
  grunt.registerTask('default', [
    'nodemon'
  ]);

  grunt.registerTask('serve', [
    'browserSync'
  ]);
};
