module.exports = {
    options: {
        algorithm: 'md5',
        length: 8
    },
    dist: {
        src: [
            '<%=yo.dist%>/static/**/*.{js,css,png,jpg,jpeg,gif,ttf,eot,otf,svg,woff,woff2}',
            '!<%=yo.dist%>/static/local/**/*'
        ]
    }
};