module.exports=function(app){

    var index = require('./web/index')(app);

    var login = require('./web/login')(app);

    var validateCode=require('./web/validateCode')(app);

    var checkValidateCode=require('./web/checkValidateCode')(app);

    var register=require('./web/register')(app);

    var checkOperate=require('./web/checkOperate')(app);

    var test=require('./web/test')(app);


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

};