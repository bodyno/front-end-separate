module.exports=function(app){
    app.get('/',function(req,res){
        res.render('index', {
            pageTitle: '登录',
            header:'home'
        });
    });
};