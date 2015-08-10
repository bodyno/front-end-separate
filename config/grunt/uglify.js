'use strict';

module.exports = {
    dist: {
        files: [{
            expand: true,
            cwd: '<%=yo.dist%>/static/js/',
            src: '**/*.js',
            dest: '<%=yo.dist%>/static/js/',
        }]
    }
};
