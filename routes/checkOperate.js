var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.param("operator")!="1234"){
        res.end("true")
    }else{
        res.end("false")
    }
});

module.exports = router;
