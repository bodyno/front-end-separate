var express = require('express');
var vm = require('express-velocity');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');//路由


var app = express();
var dir=process.env.dir||"src";

//设置vm模版
app.engine(".vm", vm({root: __dirname + "/"+dir+"/views"}))
app.set('view engine', 'vm')
app.set("views", __dirname + "/"+dir+"/views")

app.use(logger('dev'));
//是否使用favicon图标--不需要 页面已写
app.use(favicon(__dirname + '/src/static/images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'ig session',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname + "/"+dir+"")));

//路由
routes(app);


module.exports = app;