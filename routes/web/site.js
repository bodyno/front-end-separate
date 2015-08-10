module.exports = function (app) {

    //登录中间件
    app.use(function (req, res, next) {
        app.locals.middle = {
            username: req.session.username,
            language: req.cookies.lng
        }
        return next()
    })

    app.get('/', function (req, res) {
        res.render('index', app.locals.middle);
    });

    app.get('/sports', function (req, res) {
        res.render('sports', app.locals.middle);
    });

    app.get('/lottery', function (req, res) {
        res.render('lottery', app.locals.middle);
    });

    app.get('/slot', function (req, res) {
        res.render('slot', app.locals.middle);
    });

    app.get('/casino', function (req, res) {
        res.render('casino', app.locals.middle);
    });

    app.get('/promotion', function (req, res) {
        res.render('promotion', app.locals.middle);
    });

    app.get('/help', function (req, res) {
        res.render('help', app.locals.middle);
    });

    app.get('/pintai', function (req, res) {
        res.render('pintai')
    });

    app.get('/signout', function (req, res) {
        req.session.username = '';
        res.redirect('/');
    });
};