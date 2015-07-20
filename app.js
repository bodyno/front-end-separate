var express = require('express');
var vm = require('express-velocity');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var login = require('./routes/login');
var validateCode=require('./routes/validateCode');
var checkValidateCode=require('./routes/checkValidateCode');
var register=require('./routes/register');
var checkOperate=require('./routes/checkOperate');

var app = express();

// view engine setup
app.engine(".vm", vm({
  root: __dirname + "/src/views"  //duplicated with views setting but required for velocity template
}))
app.set('view engine', 'vm');
app.set("views", __dirname + "/src/views")

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname+"/src")));

app.use('/', index);
app.use('/login', login);
app.use('/validateCode', validateCode);
app.use('/checkValidateCode', checkValidateCode);
app.use('/register', register);
app.use('/checkOperate', checkOperate);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
