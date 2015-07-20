var express = require('express');
var router = express.Router();
var fs=require("fs");

router.get('/', function(req, res, next) {
    fs.readFile("src/static/imgs/temp_code.jpg","binary",function(error,result){
        res.end(result,'binary')
    });
});

module.exports = router;
