'use strict';

module.exports = {
  dev: {
    expand: true,
    ext: '.css',
    cwd: '<%=yo.app%>/static/css',
    src: [
      '**/*.less',
      '!common/{icon,repeat-x,repeat-y}.less'
    ],
    dest: '.tmp/static/css'
  },
  dist: {
    expand: true,
    ext: '.css',
    cwd: '<%=yo.app%>/static/css',
    src: [
      '**/*.less',
      '!common/{icon,repeat-x,repeat-y}.less'
    ],
    dest: '.tmp/concat/static/css'
  }
}
