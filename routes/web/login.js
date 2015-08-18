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

    app.get('/checkCustCode', function (req, res) {
        if (req.param("custCode") != "1234") {
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
                {formCode: "country",isShow:true, isRequire: false, validator: true},
                {formCode: "affiliateId",isShow:false, isRequire: false, validator: true},
                {formCode: "firstName",isShow:true, isRequire: true, validator: true},
                {formCode: "lastName",isShow:true, isRequire: true, validator: true},
                {formCode: "nickName",isShow:true, isRequire: true, validator: true},
                {formCode: "enName",isShow:true, isRequire: true, validator: true},
                {formCode: "birthDate",isShow:true, isRequire: true, validator: true},
                {formCode: "certificateType",isShow:true, isRequire: true, validator: true},
                {formCode: "certificate",isShow:true, isRequire: true, validator: true},
                {formCode: "custGender",isShow:true, isRequire: true, validator: true},
                {formCode: "mobileNumber",isShow:true, isRequire: true, validator: true},
                {formCode: "drawPwd",isShow:true, isRequire: true, validator: true},
                {formCode: "qq",isShow:true, isRequire: true, validator: true},
                {formCode: "emailAddress",isShow:true, isRequire: true, validator: true},
                {formCode: "validateCode",isShow:true, isRequire: true, validator: true}
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
            }, {"key": "United States", "value": "US"}, {"key": "Vietnam", "value": "VN"}],
            certificateType: [
                {
                    "key": "ID number",
                    "value": "2BB"
                },
                {
                    "key": "Driver license",
                    "value": "2BC"
                },
                {
                    "key": "Military officer",
                    "value": "2BE"
                },
                {
                    "key": "Passport",
                    "value": "2BF"
                }
            ]
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