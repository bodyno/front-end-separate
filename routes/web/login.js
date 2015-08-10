module.exports = function (app) {
    app.get('/login', function (req, res) {
        req.session.username = 'SH_frank008';
        res.render('login', {
            header: 'login'
        });
    });

    app.post('/login', function (req, res) {
        res.json({
            "result": "登录成功！",
            "code": "200",
            "msg": ""
        });
    });

    app.get('/checkOperate', function (req, res) {
        if (req.param("operator") != "1234") {
            res.end("true")
        } else {
            res.end("false")
        }
    });

    //注册
    app.get('/register', function (req, res) {
        res.render('register', {
            header: 'login',
            form: [
                {name: "country", require: true, valid: true},
                {name: "introduce", require: true, valid: true},
                {name: "surname", require: true, valid: true},
                {name: "name", require: true, valid: true},
                {name: "realname", require: true, valid: true},
                {name: "enname", require: true, valid: true},
                {name: "birthday", require: true, valid: true},
                {name: "card", require: true, valid: true},
                {name: "cardno", require: true, valid: true},
                {name: "phone", require: true, valid: true},
                {name: "moneypassword", require: true, valid: true},
                {name: "qq", require: true, valid: true},
                {name: "email", require: true, valid: true},
                {name: "validateCode", require: true, valid: true}
            ],
            country: [{"key": "Australia", "value": "AU"}, {"key": "Brunei", "value": "BN"}, {
                "key": "Cambodia",
                "value": "KH"
            }, {"key": "Canada", "value": "CA"}, {"key": "China", "value": "CN"}, {
                "key": "EU",
                "value": "EU"
            }, {"key": "India", "value": "IN"}, {"key": "Indonesia", "value": "ID"}, {
                "key": "Japan",
                "value": "JP"
            }, {"key": "Korea", "value": "KR"}, {"key": "Laos", "value": "LA"}, {
                "key": "Malaysia",
                "value": "MY"
            }, {"key": "Myanmar", "value": "MM"}, {"key": "New Zealand", "value": "NZ"}, {
                "key": "Philippines",
                "value": "PH"
            }, {"key": "Russia", "value": "RU"}, {"key": "Singapore", "value": "SG"}, {
                "key": "Thailand",
                "value": "TH"
            }, {"key": "United States", "value": "US"}, {"key": "Vietnam", "value": "VN"}]
        });
    });

    app.post('/register', function (req, res) {
        res.json({
            "result": "注册成功！",
            "code": "200",
            "msg": "sid-error_SID_ERROR_00"
        });
    });
};