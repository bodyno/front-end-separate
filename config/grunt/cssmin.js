'use strict';

module.exports = {
  // This task is pre-configured if you do not wish to use Usemin
  // blocks for your CSS. By default, the Usemin block from your
  // `index.html` will take care of minification, e.g.
  //
  //     <!-- build:css({.tmp,app}) css/main.css -->
  //
  dist: {
    options:{
      keepSpecialComments:false
    },
    files: [{
      expand: true,
      cwd: '.tmp/concat/static/css/',
      src: '**/*.css',
      dest: '<%=yo.dist%>/static/css/',
      //ext: '.min.css'
    }]
  }
};
