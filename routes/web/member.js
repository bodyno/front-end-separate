var _=require("underscore");
module.exports = function (app) {

    function mid(obj){
        return _.extend({},app.locals.middle,obj)
    }

    app.get('/member/safe', function (req, res) {
        res.render('member/safe', mid({
            //sidCustInfo:{
            //    "custPersoninfoId": 1,
            //    "lastName": "**008",
            //    "firstName": "SH_frank",
            //    "custGender": "01F",
            //    "birthDate": "Aug 27, 2015 528 PM"
            //}
        }));
    });

    app.get('/member/history', function (req, res) {
        res.render('member/history', mid({

        }));
    });

    app.get('/member/address', function (req, res) {
        res.render('member/address', mid({

        }));
    });

    app.get('/member/promo', function (req, res) {
        res.render('member/promo', mid({

        }));
    });

    app.get('/member/message', function (req, res) {
        res.render('member/message', mid({

        }));
    });


    app.post('/member/history', function (req, res) {
        res.json({
            "code": "200",
            "msg": ""
        });
    });

    app.post('/sidCustInfo/savePersonInfo', function (req, res) {
        res.json({
            "code": "200",
            "msg": ""
        });
    });

    app.post('/message/saveCrmMessage', function (req, res) {
        res.json({
            "code": "200",
            "msg": ""
        });
    });

    app.get('/message/listInbox', function (req, res) {
        res.json({
            "code": "200",
            "msg": "",
            "data":[
                {
                    "custMessageId": 1,
                    "messageTo": "VIP邀请",
                    "subject": "已成功绑定邮箱，彩金将在第一次提款后派发！",
                    "content": "恭喜您！您已成功绑定电子邮箱。本次绑定邮箱所获得的10元彩金将在您第一次成功提款后自动派发到您的中心钱包，1倍流水可提款。如果您尚未进行过提款，彩金将在锁定钱包中等待您首次成功提款后即可自动转入中心钱包。",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08UR"
                },
                {
                    "custMessageId": 2,
                    "messageTo": "VIP邀请",
                    "subject": "已成功绑定邮箱，彩金将在第一次提款后派发！",
                    "content": "恭喜您！您已成功绑定电子邮箱。本次绑定邮箱所获得的10元彩金将在您第一次成功提款后自动派发到您的中心钱包，1倍流水可提款。如果您尚未进行过提款，彩金将在锁定钱包中等待您首次成功提款后即可自动转入中心钱包。",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08HR"
                },
                {
                    "custMessageId": 3,
                    "messageTo": "VIP邀请",
                    "subject": "已成功绑定邮箱，彩金将在第一次提款后派发！",
                    "content": "恭喜您！您已成功绑定电子邮箱。本次绑定邮箱所获得的10元彩金将在您第一次成功提款后自动派发到您的中心钱包，1倍流水可提款。如果您尚未进行过提款，彩金将在锁定钱包中等待您首次成功提款后即可自动转入中心钱包。",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08HR"
                },
                {
                    "custMessageId": 4,
                    "messageTo": "VIP邀请",
                    "subject": "subject04",
                    "content": "content04",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08HR"
                },
                {
                    "custMessageId": 4,
                    "messageTo": "VIP邀请",
                    "subject": "subject04",
                    "content": "content04",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08UR"
                },
                {
                    "custMessageId": 4,
                    "messageTo": "VIP邀请",
                    "subject": "subject04",
                    "content": "content04",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08UR"
                },
                {
                    "custMessageId": 4,
                    "messageTo": "VIP邀请",
                    "subject": "subject04",
                    "content": "content04",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08UR"
                },
                {
                    "custMessageId": 4,
                    "messageTo": "VIP邀请",
                    "subject": "subject04",
                    "content": "content04",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08UR"
                },
                {
                    "custMessageId": 4,
                    "messageTo": "VIP邀请",
                    "subject": "subject04",
                    "content": "content04",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08UR"
                },
                {
                    "custMessageId": 10,
                    "messageTo": "VIP邀请10",
                    "subject": "subject04",
                    "content": "content04",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08UR"
                }
            ]
        });
    });

    app.get('/message/listOutbox', function (req, res) {
        res.json({
            "code": "200",
            "msg": "",
            "data":[
                {
                    "custMessageId": 1,
                    "messageTo": "VIP邀请",
                    "subject": "1111111111111111111111111111111111111",
                    "content": "恭喜您！您已成功绑定电子邮箱。本次绑定邮箱所获得的10元彩金将在您第一次成功提款后自动派发到您的中心钱包，1倍流水可提款。如果您尚未进行过提款，彩金将在锁定钱包中等待您首次成功提款后即可自动转入中心钱包。",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08UR"
                },
                {
                    "custMessageId": 2,
                    "messageTo": "VIP邀请",
                    "subject": "已成功绑定邮箱，彩金将在第一次提款后派发！",
                    "content": "恭喜您！您已成功绑定电子邮箱。本次绑定邮箱所获得的10元彩金将在您第一次成功提款后自动派发到您的中心钱包，1倍流水可提款。如果您尚未进行过提款，彩金将在锁定钱包中等待您首次成功提款后即可自动转入中心钱包。",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08HR"
                },
                {
                    "custMessageId": 3,
                    "messageTo": "VIP邀请",
                    "subject": "已成功绑定邮箱，彩金将在第一次提款后派发！",
                    "content": "恭喜您！您已成功绑定电子邮箱。本次绑定邮箱所获得的10元彩金将在您第一次成功提款后自动派发到您的中心钱包，1倍流水可提款。如果您尚未进行过提款，彩金将在锁定钱包中等待您首次成功提款后即可自动转入中心钱包。",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08HR"
                },
                {
                    "custMessageId": 4,
                    "messageTo": "VIP邀请",
                    "subject": "subject04",
                    "content": "content04",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08HR"
                },
                {
                    "custMessageId": 4,
                    "messageTo": "VIP邀请",
                    "subject": "subject04",
                    "content": "content04",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08UR"
                },
                {
                    "custMessageId": 4,
                    "messageTo": "VIP邀请",
                    "subject": "subject04",
                    "content": "content04",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08UR"
                },
                {
                    "custMessageId": 4,
                    "messageTo": "VIP邀请",
                    "subject": "subject04",
                    "content": "content04",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08UR"
                },
                {
                    "custMessageId": 4,
                    "messageTo": "VIP邀请",
                    "subject": "subject04",
                    "content": "content04",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08UR"
                },
                {
                    "custMessageId": 4,
                    "messageTo": "VIP邀请",
                    "subject": "subject04",
                    "content": "content04",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08UR"
                },
                {
                    "custMessageId": 10,
                    "messageTo": "VIP邀请10",
                    "subject": "subject04",
                    "content": "content04",
                    "messageType": "08IB",
                    "createdTime": "Aug 27, 2015 207 PM",
                    "custId": 57,
                    "status": "08UR"
                }
            ]
        });
    });


    app.post('/message/saveCrmMessage', function (req, res) {
        res.json({
            "code": "200",
            "msg": ""
        });
    });

    app.post('/message/deleteCrms', function (req, res) {
        res.json({
            "code": "200",
            "msg": ""
        });
    });

    app.post('/message/saveCrmMessage', function (req, res) {
        res.json({
            "code": "200",
            "msg": ""
        });
    });

    app.post('/sidCustInfo/getEmailCode', function (req, res) {
        res.json({
            "code": "200",
            "msg": ""
        });
    });

    app.post('/sidCustInfo/bindEmail', function (req, res) {
        res.json({
            "code": "200",
            "msg": ""
        });
    });

};