module.exports=function(app){
    app.get('/login',function(req,res){
        res.render('login', {
            pageTitle: '登录'
        });
    });

    app.post('/login',function(req,res){
        res.json({
            "result":"登录成功！",
            "code":"200",
            "msg":""
        });
    });
};