module.exports = function () {
    var cdnRoot = require('../app').cdnDomain[process.env.DEPLOY_TYPE] || '';
    //var cdnRoot="http://nobody.com"
    return {
        // look under this files
        css: '<%=yo.dist%>/static/**/*.css',
        html: '<%=yo.dist%>/views/**/*.vm',
        js: '<%=yo.dist%>/static/**/*.js',
        options: {
            // 配置cdn
            patterns: require('../usemin-pattern').pattern(cdnRoot)
        }
    };
};
