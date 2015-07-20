'use strict';

module.exports = function(grunt) {
  var url = require('url');
  var path = require('path');
  var fs = require('fs');
  var querystring = require('querystring');

  var app = require('../app');
  var localhost = grunt.option('host') || 'localhost';
  var port = grunt.option('port') || app.port.www;
  var rewriteRulesSnippet = require('grunt-connect-route/lib/utils').rewriteRequest;
  var mountFolder = function(connect, dir) {
    return connect.static(path.resolve(dir));
  };

  // parse velocity template
  function velocityParser (req, res, next, env) {
    env = env || 'dev'; //区分当前serve类型
    function requireUncached(module){
      var requirePath = path.resolve(process.cwd(), module);
      delete require.cache[requirePath];
      return require(requirePath);
    }

    var routerPage = requireUncached('config/router-page');
    var Engine = require('velocity/lib/engine');

    // parse VM template
    var urlObject = url.parse(req.url);
    var template = routerPage[urlObject.pathname];
    var templateRoot = grunt.config('velocity.root.' + env);
    var templateAbsPath = path.join(templateRoot, template + '.' + grunt.config('velocity.ext'));

    if (fs.existsSync(templateAbsPath)) {
      var engine = new Engine({
        root: templateRoot,
        template: templateAbsPath,
        macro: path.resolve(process.cwd(), grunt.config('velocity.macro'))
      });
      var contextFile = grunt.config('velocity.data.page') + template;
      var context = {};

      if (fs.existsSync(contextFile + '.js')) {
        try {
          context = requireUncached(contextFile)(req, res);
        }
        catch (e) {
          console.log('\n');
          grunt.warn('File "' + contextFile + '.js" require failed.\n' + e);
        }
      }
      var result = engine.render(context);
      res.setHeader('Content-Type', 'text/html;charset=UTF-8');
      res.end(result.trim());
    } else {
      next();
    }
  }

  return {
    rules: require('../router-api'),
    options: {
      port: port,
      // change this to '0.0.0.0' to access the server from outside
      hostname: '0.0.0.0',
      //localhost: 'my.yo.com',
      localhost: localhost,
    },
    dev: {
      options: {
        livereload: app.port.liveReload,
        open: grunt.option('ignore-open') ? false : 'http://localhost/',
        middleware: function (connect) {
          return [
            //mountFolder(connect, '.tmp'),
            mountFolder(connect, app.path.app),
            rewriteRulesSnippet,
            function(req, res, next) {
              return velocityParser(req, res, next, 'dev');
            }
          ];
        }
      }
    },
    dist: {
      options: {
        keepalive: true,
        middleware: function (connect) {
          return [
            mountFolder(connect, app.path.dist),
            rewriteRulesSnippet,
            function(req, res, next) {
              return velocityParser(req, res, next, 'dist');
            }
          ];
        }
      }
    },
  };
};
