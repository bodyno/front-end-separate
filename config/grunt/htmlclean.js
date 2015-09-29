module.exports = {
    deploy: {
        expand: true,
        cwd: 'dist/views',
        src: '**/*.vm',
        dest: 'dist/views'
    }
}