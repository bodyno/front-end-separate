module.exports = {

    port: {
        www: 3001,
        liveReload: 35740
    },

    // 路径配置
    path: {
        // 程序主目录
        app: 'app',
        // 发布目录
        dist: 'dist'
    },

    // 配置不同的cdn域
    cdnDomain: {
        dev: 'http://dev.cdn.yourdomain.com',
        beta: 'http://beta.cdn.yourdomain.com',
        prepare: 'http://cdn.yourdomain.com',
        prod: 'http://cdn.yourdomain.com/'
    }

};
