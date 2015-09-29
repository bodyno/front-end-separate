'use strict';

module.exports = {
    options:{
        preserveComments:false
    },
    dist: {
        files: [{
            expand: true,
            cwd: '<%=yo.dist%>/static/js/',
            src: '**/*.js',
            dest: '<%=yo.dist%>/static/js/'
        },{
            expand: true,
            cwd: '<%=yo.dist%>/static/plugin/',
            src: '**/*.js',
            dest: '<%=yo.dist%>/static/plugin/'
        }]
    }
};
