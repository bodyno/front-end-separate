var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('register', {
        pageTitle: '注册'
    });
});

router.post('/', function(req, res, next) {
    res.json({
        "result":"注册成功！",
        "code":"200",
        "msg":"sid-error_SID_ERROR_00"
    });
});

module.exports = router;
