module.exports = {
    dist: {
        files: [{
            dot: true,
            src: [
                '.tmp',
                '<%=yo.dist%>/*',
                '!<%=yo.dist%>/.git*'
            ]
        }]
    },
    tmp: '.tmp',
    svn: '<%=yo.dist%>/static/plugin/.svn'
};
