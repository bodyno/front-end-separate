/**
 * @fileOverview Gruntfile
 * @author <a href="mailto:az8321550@gmail.com">Nobody</a>
 * @version 1.0.0
 *  Add time-grunt/jshint-style 2014/1/29
 * @example
 *   > grunt --gruntfile=/home/webapp/src/Gruntfile.js --node-modules=/home/zhi.zhong
 *   // --gruntfile: 指定Gruntfile.js文件的位置，在项目根目录外运行Grunt会用到该参数
 *   // --node-modules: 指定开发环境依赖包的位置，只需要指定到node_modules父目录即可
 *                      使用该参数便于在同一机器上运行多个分支时共享依赖包
 *   // --deploy-type: 指定当前编译类型，取值可能是dev/beta/prod/prepare,分别对应的是dev/QA/正式/灰度发布
 *
 *   server命令参数
 *   > grunt server --host=localhost --port=9001
 *   // --host: 指定自动打开浏览器的域名，默认值：localhost
 *   // --port: 指定自动打开浏览器的端口号，默认值：9000
 *   // --ignore-open  禁止自动启动浏览器功能
 *   // --ignore-urlrewrite 禁止地址转发功能
 *
 *   > grunt server:dist 预览编译后的文件
 *
 */

'use strict';

module.exports = function (grunt) {
  // 定义编译类型，并将其存入运行环境变量中
  process.env.DEPLOY_TYPE = grunt.option('deploy-type') || '';

  // node_modules父目录
  var nodeModulesDir = grunt.option('node-modules') || '.';

  // 非开发模式加载dependencies下的包
  //var filterFunction = 'filter';

  // // 开发模式加载全部依赖
  // if (process.env.DEPLOY_TYPE === '') {
  //   // var routeUtils = 'grunt-connect-route/lib/utils';
  //   // if (nodeModulesDir) {
  //   //   routeUtils = nodeModulesDir + '/node_modules/' + routeUtils;
  //   // }
  //   // var rewriteRulesSnippet = require(routeUtils).rewriteRequest;
  //   filterFunction = 'filterAll';
  // }

  // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('matchdep').filterAll('grunt-*').forEach(function(nodeModule) {
    if (nodeModulesDir) {
      var cwd = process.cwd();
      process.chdir(nodeModulesDir);
      grunt.loadNpmTasks(nodeModule);
      process.chdir(cwd);
    } else {
      grunt.loadNpmTasks(nodeModule);
    }
  });

  // 各模块运行所消耗的时间，可以用来指导优化编译过程
  require(nodeModulesDir + '/node_modules/' + 'time-grunt')(grunt);

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
    rev: require('./config/grunt/rev')

  };

  // The initialization of Grunt configuration parameters
  grunt.initConfig(config);

  // Registration start a local web server tasks
  grunt.registerTask('serve', function(target) {
    var tasks = [];

    // grunt.log
    //   .subhead(this.name + ' options:')
    //   .writeln(require('util').inspect(options));

    // Compile and preview the compiled result
    if (target === 'dist') {
      tasks = [
        'build',
        'configureRewriteRules',
        'connect:dist'
      ];
    } else {
      tasks = [
        'clean:server',
        'less:dev',
        'autoprefixer:dev'
      ];
      if (!grunt.option('ignore-urlrewrite')) {
        tasks.push('configureRewriteRules');
      }
      tasks.push('connect:dev', 'watch');
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve' + (target ? ':' + target : '')]);
  });

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
    'build'
  ]);
};
