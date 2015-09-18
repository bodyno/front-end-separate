module.exports = {
    dist: {
        expand: true,
        ext: '.css',
        cwd: '<%=yo.app%>/static/css',
        src: ['**/*.less'],
        dest: '.tmp/static/css'
    }
}
