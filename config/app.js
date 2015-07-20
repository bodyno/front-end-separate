/**
 * @fileOverview Pad touch webapp config file
 * @version 0.0.1
 *
 */

module.exports = {

    port: {
      www: 80,
      liveReload: 35740
    },

    // 路径配置
    path: {
        // 程序主目录
        app: 'src',
        // 发布目录
        dist: 'dist'
    },

    // 访问不同环境对应的qzz域名
    cdnDomain: {
        '': '',
        dev: 'http://dev.cdn.yourdomain.com',
        beta: 'http://beta.cdn.yourdomain.com',
        prepare: 'http://cdn.yourdomain.com',
        prod: 'http://cdn.yourdomain.com'
    },

};
