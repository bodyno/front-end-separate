module.exports = function () {
  return {
    // look under this files
    css: '<%=yo.dist%>/static/**/*.css',
    html: '<%=yo.dist%>/**/*.html',
    js: '<%=yo.dist%>/static/**/*.js',
    options: {
      // 正则配置
      patterns: require('../usemin-pattern').pattern('')
    }
  };
};
