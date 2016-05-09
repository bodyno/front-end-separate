module.exports = {
    options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 20,
        process:function(basename, name, extension){
            return name+"."+extension;
        }
    },
    dist: {
        src: [
            '<%=yo.dist%>/static/**/*.{js,css,png,jpg,jpeg,gif,ttf,eot,otf,svg,woff,woff2}'
        ]
    }
};
