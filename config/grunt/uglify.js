module.exports = {
    options:{
        preserveComments:false
    },
    dist: {
        files: [{
            expand: true,
            cwd: '<%=yo.dist%>/static/scripts/',
            src: '**/*.js',
            dest: '<%=yo.dist%>/static/scripts/'
        }
        ,{
            expand: true,
            cwd: '<%=yo.dist%>/static/plugin/',
            src: '**/*.js',
            dest: '<%=yo.dist%>/static/plugin/'
        }
        ]
    }
};
