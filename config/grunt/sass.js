'use strict';

module.exports = {
    options:{
        "outputStyle":"expanded"
    },
    hehe: {
        expand: true,
        cwd: '<%=yo.app%>/static/css',
        src: ['**/*.scss'],
        dest: '<%=yo.app%>/static/css',
        ext: '.css'
    },
    build: {
        expand: true,
        cwd: '<%=yo.app%>/static/css',
        src: ['**/*.scss'],
        dest: '.tmp/static/css',
        ext: '.css'
    }
}
