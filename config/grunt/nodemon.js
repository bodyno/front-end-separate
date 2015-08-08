module.exports = {
    dist: {
        options: {
            file: 'app.js',
            ignore: ['README.md', 'node_modules/**', '.DS_Store'],
            watch: ['routes','app.js'],
            delay: 300,
            env: {
                PORT: 3000
            }
        }
    }
};
