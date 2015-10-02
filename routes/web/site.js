var _=require("underscore");
module.exports = function (app) {

    //登录中间件
    app.use(function (req, res, next) {
        app.locals.middle = {
            username: req.session.username,
            language: req.cookies.lng,
            unRead:5,
            token:"1122334455",
            loginMsg:"",
            disSidCust:
            {
                "username": "SH_frank008", //用户号
                "firstName": "张",
                "lastName": "三",
                "mobileNumber": "135XXXX",
                "emailAddress": "123456@qq.com",
                "diffDate": "10分30秒",  //记录上次登录
                "curAccount": 300.00,   //中心账户
                "accountStr": "300.00",
                "securityState": "高", //很高 , 高 ，一般 ，低 ，很低 ，危险
                "percentage": 100,    //100  , 80 , 60  , 40  , 20 ，0
                "isBindName": true, //是否绑定真实名
                "isBindBank": true,//是否绑定银行卡
                "isBindEmail": true,  // 是否绑定email
                "isBindPhone": false, // 是否绑定手机
                "isBindPayPwd": true, // 是否绑定支付密码
                "tips":"忙碌了一整天，晚餐吃顿好的吧。",
                "hello":"晚上好",
                "username":"徐 先生"
            }
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

    app.get('/forbidden', function (req, res) {
        res.render('forbidden', app.locals.middle);
    });

    app.get('/slot_pt', function (req, res) {
        res.render('slot_pt', _.extend({},app.locals.middle,{
        }));
    });

    app.get('/slot_gpi', function (req, res) {
        res.render('slot_gpi', _.extend({},app.locals.middle,{
        }));
    });

    app.get('/slot_mgs', function (req, res) {
        res.render('slot_mgs', _.extend({},app.locals.middle,{
        }));
    });

    app.get('/slot_ttg', function (req, res) {
        res.render('slot_ttg', _.extend({},app.locals.middle,{
        }));
    });

    app.get('/slot_bs', function (req, res) {
        res.render('slot_bs', _.extend({},app.locals.middle,{
        }));
    });

    app.get('/slot_ctxm', function (req, res) {
        res.render('slot_ctxm', _.extend({},app.locals.middle,{
        }));
    });

    app.get('/slot_png', function (req, res) {
        res.render('slot_png', _.extend({},app.locals.middle,{
        }));
    });

    app.get('/slot', function (req, res) {
        res.render('slot', _.extend({},app.locals.middle,{

        }));
    });

    app.get('/casino', function (req, res) {
        res.render('casino', app.locals.middle);
    });

    app.get('/promotion', function (req, res) {
        res.render('promotion', app.locals.middle);
    });

    app.get('/about', function (req, res) {
        res.render('about', app.locals.middle);
    });

    app.get('/contact', function (req, res) {
        res.render('contact', app.locals.middle);
    });

    app.get('/help', function (req, res) {
        res.render('help', app.locals.middle);
    });

    app.get('/register_success', function (req, res) {
        res.render('reg_ok', app.locals.middle)
    });

    app.get('/pintai', function (req, res) {
        res.render('pintai')
    });

    app.get('/pt', function (req, res) {
        res.render('game/pt_page')
    });

    app.get('/game', function (req, res) {
        res.render('game/game')
    });

    app.get('/test', function (req, res) {
        res.render('test')
    });

    app.get('/error', function (req, res) {
        res.render('error')
    });

    app.get('/signout', function (req, res) {
        req.session.username = '';
        res.redirect('/');
    });
};


