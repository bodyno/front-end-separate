var _=require("underscore");
module.exports = function (app) {

    function mid(obj){
        return _.extend({},app.locals.middle,obj)
    }

    app.get('/login', function (req, res) {
        res.render('login', {
            header: 'login'
        });
    });

    app.post('/login', function (req, res) {
        req.session.username = 'SH_frank008';
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
        req.session.username = 'SH_frank008';
        res.render('register', mid({
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
            ]
        }));
    });

    app.post('/register', function (req, res) {
        res.json({
            "result": "注册成功！",
            "code": "200",
            "msg": "sid-error_SID_ERROR_00"
        });
    });
};