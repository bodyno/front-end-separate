module.exports = {
    copy: [
        'coffee:build',
        'copy:plugin',
        'copy:others',
        'copy:local',
        'copy:image'
    ],
    clean: [
        'clean:tmp',
        'clean:svn'
    ]
}