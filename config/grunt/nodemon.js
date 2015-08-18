module.exports = {
    dist: {
        options: {
            file: 'app.js',
            ignore: ['README.md', 'node_modules/**'],
            watch: ['routes','app.js'],
            delay: 300,
            env: {
                PORT: 8080
            }
        }
    }
};
