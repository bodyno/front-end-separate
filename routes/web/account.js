var _=require("underscore");
module.exports = function (app) {

    function mid(obj){
        return _.extend({},app.locals.middle,obj)
    }

    app.get('/account', function (req, res) {
        res.render('account', mid({

        }));
    });

    app.get('/profile', function (req, res) {
        res.render('account_profile', mid({
            "sidCustInfo":{
                "operator": 'm88test8887',
                "passwd": "123",
                "affiliateId": "13",
                "custPersoninfoId": 1,
                "nickName": "LIUXIANG",
                "lastName": "liu",
                "firstName": "xiang",
                "enName": "james",
                "certificate": "51978956322",
                "certificateType": "2BC",
                "custId": 1,
                "custGender": "01F",
                "birthDate": "2014-12-30",
                "country": "CHINA",
                "qq": "7893516345",
                "emailAddress": "123456@qq.com",
                "mobileNumber": "136XXXXXX90",
                "custContactinfoId": 1,
                "validateCode": null,
                "effDate":"2014-12-30"
            },
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
        }));
    });
    app.get('/safe', function (req, res) {
        res.render('account_safe', mid());
    });
    app.get('/history', function (req, res) {
        res.render('account_history', mid({

        }));
    });
    app.get('/message', function (req, res) {
        res.render('account_message', mid({

        }));
    });
    app.get('/inbox', function (req, res) {
        res.render('account_inbox', mid({

        }));
    });
    app.get('/advice', function (req, res) {
        res.render('account_advice', mid({

        }));
    });
    app.get('/cashier', function (req, res) {
        res.render('account_cashier', mid({

        }));
    });
    app.get('/deposit', function (req, res) {
        res.render('account_deposit', mid({
            paySetting:["02TP","02CD","02PP","02AI","02MP"],
            item:[
                {
                    quotaSetting:{
                        maxMoney:1000,
                        minMoney:1000,
                        maxDialyMoney:1000,
                        maxPending:1000
                    },
                    bankList:["1","2","2","2","2"]
                },
                {
                    quotaSetting:{
                        maxMoney:1000,
                        minMoney:1000,
                        maxDialyMoney:1000,
                        maxPending:1000
                    },
                    bankList:["1","2","2","2","2"]
                }
            ]
        }));
    });
    app.get('/withdraw', function (req, res) {
        res.render('account_withdraw', mid({
            banks:["ICBC","CMB","CMBC","SPDB","BCM"]
        }));
    });
    app.get('/transfer', function (req, res) {
        res.render('account_transfer', mid({

        }));
    });
    app.get('/credits', function (req, res) {
        res.render('account_credits', mid({

        }));
    });


    app.post('/sidCustInfo/savePassword', function (req, res) {
        res.json({
            "code":"200",
            "msg":"sid-success:SID_SUC_04"
        });
    });

    //转账
    app.post('/sidCustInfo/transFunds', function (req, res) {
        res.json({
            "code":"200",
            "msg":"sid-success:SID_SUC_04"
        });
    });

    //提款
    app.post('/cashier/withdraw', function (req, res) {
        res.json({
            "code":"200",
            "msg":"sid-success:SID_SUC_04"
        });
    });
};