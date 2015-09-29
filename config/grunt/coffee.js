module.exports = {
    options:{
        bare:true
    },
    hehe:{
        files: [{
            expand: true,
            cwd: '<%=yo.app%>/static/js/',
            src: '**/*.coffee',
            dest: '<%=yo.app%>/static/js/',
            ext: '.js'
        }]
    },
    build: {
        files: [{
            expand: true,
            cwd: '<%=yo.app%>/static/js/',
            src: '**/*.coffee',
            dest: '<%=yo.dist%>/static/js/',
            ext: '.js'
        }]
    }
};
