module.exports=function(app){
    app.get('/register',function(req,res){
        res.render('register', {
            pageTitle: '注册'
        });
    });

    app.post('/register',function(req,res){
        res.json({
            "result":"注册成功！",
            "code":"200",
            "msg":"sid-error_SID_ERROR_00"
        });
    });
};
