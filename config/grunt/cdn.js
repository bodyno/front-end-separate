module.exports = function () {
  var cdnRoot = require('../config').cdnDomain['prod'];
  return {
    options: {
      cdn: cdnRoot,
      flatten: true,
      supportedTypes: {'phtml': 'html'}
    },
    dist: {
      cwd: '<%=yo.dist%>',
      src: ['**/*.html', '**/*.css'],
      dest: '<%=yo.dist%>'
    }
  }

}
