module.exports = {
    dist: {
        options: {
            keepSpecialComments: false
        },
        files: [{
            expand: true,
            cwd: '.tmp/static/styles/',
            src: '**/*.css',
            dest: '<%=yo.dist%>/static/styles/'
        },{
            expand: true,
            cwd: '<%=yo.app%>/static/plugin/',
            src: '**/*.css',
            dest: '<%=yo.dist%>/static/plugin/'
        }]
    }
};
