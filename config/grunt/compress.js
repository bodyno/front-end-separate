module.exports = {
    main: {
        options: {
            archive: function(){
                var string=new Date().toLocaleString()
                return 'back/'+string.substring(0,string.indexOf(" "))+'_'+(new Date().getTime())+'.zip'
            },
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