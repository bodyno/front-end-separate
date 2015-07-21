var express = require('express');
var vm = require('express-velocity');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//路由
var routes=require('./routes/routes')

var app = express();

//设置vm模版
app.engine(".vm", vm({root: __dirname + "/src/views"}))
app.set('view engine', 'vm');
app.set("views", __dirname + "/src/views")

//是否使用favicon图标--不需要 页面已写
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname+"/src")));

//路由
routes(app)


module.exports = app;
