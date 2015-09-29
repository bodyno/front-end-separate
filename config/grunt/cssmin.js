'use strict';

module.exports = {
    dist: {
        options: {
            keepSpecialComments: false
        },
        files: [{
            expand: true,
            cwd: '.tmp/static/css/',
            src: '**/*.css',
            dest: '<%=yo.dist%>/static/css/'
        }]
    }
};
