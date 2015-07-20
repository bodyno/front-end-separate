var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', {
    pageTitle: '登录'
  });
});

router.post('/', function(req, res, next) {
  res.json({
    "result":"登录成功！",
    "code":"200",
    "msg":""
  });
});

module.exports = router;
