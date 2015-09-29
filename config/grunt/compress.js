module.exports = {
    main: {
        options: {
            archive: 'front_end_src.zip',
            pretty:true
        },
        files: [{
            cwd: 'src/',
            expand: true,
            src: ['**/*'],
            dest: 'src'
        }]
    }
}