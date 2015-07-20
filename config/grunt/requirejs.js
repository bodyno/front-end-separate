'use strict';

var path = require('path');
var util = require('util');

module.exports = function(grunt) {
  function getModulesConfig(dir) {
    // babel解析包只在运行时需要，发布的bundle文件中不需要打包
    var excludeModules = ['babel'];
    var moduleConfig = require('../bundle') || {};
    var returnConfig = [];

    for (var key in moduleConfig) {
      returnConfig.push({
        name: key,
        include: moduleConfig[key]
      });
      excludeModules.push(key);
    }

    grunt.file.recurse(dir, function(abspath, rootdir, subdir, filename) {
      if (filename === 'main.js') {
        returnConfig.push({
          name: subdir + '/main',
          exclude: excludeModules
        });
      }
    });

    grunt.verbose
      .subhead('Bundle options:')
      .writeln(util.inspect(returnConfig));

    return returnConfig;
  }

  //var config = require('../../app/static/js/common/require-config');

  return {
    dist: {
      // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
      options: {
        appDir: '<%=yo.app%>/static/js',
        dir: '<%=yo.dist%>/static/js',
        baseUrl: '.',
        paths: config.paths,
        shim: config.shim,
        config: config.config,
        pragmasOnSave: config.pragmasOnSave,
        optimize: 'none',
        findNestedDependencies: true,
        inlineText: true,
        removeCombined: true,
        useStrict: true,
        modules: getModulesConfig('app/static/js')
      }
    }
  };
};
