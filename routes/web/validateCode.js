var fs=require("fs");

module.exports=function(app){
    app.get('/validateCode',function(req,res){
        fs.readFile("src/static/imgs/temp_code.jpg","binary",function(error,result){
            res.end(result,'binary')
        });
    });
};