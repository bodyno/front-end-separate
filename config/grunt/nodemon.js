module.exports = function () {
    var port = require("../app").port.www || 80;
    return {
        dist:{
            options: {
                file: 'app.js',
                ignore: ['README.md', 'node_modules/**'],
                watch: ['routes', 'app.js'],
                delay: 300,
                env: {
                    PORT: port
                }
            }
        }
    }
}
