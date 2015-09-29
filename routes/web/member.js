var _=require("underscore");
module.exports = function (app) {

    function mid(obj){
        return _.extend({},app.locals.middle,obj)
    }

    app.get('/member/safe', function (req, res) {
        res.render('member/safe', mid({
            sidCustInfo:{
                "custPersoninfoId": 1,
                "lastName": "**008",
                "firstName": "SH_frank",
                "custGender": "01F",
                "birthDateStr": "1985/1/1"
            }
        }));
    });

    app.get('/member/history', function (req, res) {
        res.render('member/history', mid({

        }));
    });

    app.get('/member/address', function (req, res) {
        res.render('member/address', mid({
            sidCustReceive:
            {
                "custReceiveId": 1,
                "custId": "王小智",
                "province": "北京",
                "city": "广州",
                "county": "1区",
                "address": "address",
                "receiverBy": "XXX",
                "receiverPhone": "13517341111"
            }
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


    app.get('/transaction/listRecords', function (req, res) {
        res.json({
            "code": "200",
            "msg": "",
            "obj":{
                "total": 7,
                "content": [
                    {
                        "gameOrderId": 1,
                        "orderNo": "dsf342523",
                        "custId": 1,
                        "transactionType": "enum_trans_type_ip",
                        "amount": 99,
                        "remarks": "AAAD",
                        "status": "enum_success_status_s",
                        "operatorBy": 23,
                        "orderTime": "Jul 17, 2015 8:20:12 PM",
                        "operatorTime": "Aug 18, 2015 8:22:07 PM",
                        "custCode": "test01"
                    },
                    {
                        "gameOrderId": 49,
                        "orderNo": "46290ce1201508311708760",
                        "custId": 57,
                        "transactionType": "enum_trans_type_iw",
                        "amount": 100,
                        "remarks": "",
                        "status": "enum_success_status_s",
                        "operatorBy": 57,
                        "orderTime": "Aug 31, 2015 5:18:24 PM",
                        "operatorTime": "Aug 31, 2015 5:18:24 PM",
                        "custCode": "test50"
                    },
                    {
                        "gameOrderId": 50,
                        "orderNo": "49dd1ed1201508311708939",
                        "custId": 57,
                        "transactionType": "enum_trans_type_ow",
                        "amount": 1,
                        "remarks": "",
                        "status": "enum_success_status_s",
                        "operatorBy": 57,
                        "orderTime": "Aug 31, 2015 5:25:08 PM",
                        "operatorTime": "Aug 31, 2015 5:25:08 PM",
                        "custCode": "test50"
                    },
                    {
                        "gameOrderId": 51,
                        "orderNo": "1aa7abdb201508311708687",
                        "custId": 35,
                        "transactionType": "",
                        "amount": 10,
                        "remarks": "",
                        "status": "enum_success_status_s",
                        "operatorBy": 35,
                        "orderTime": "Aug 31, 2015 5:45:38 PM",
                        "operatorTime": "Aug 31, 2015 5:45:38 PM",
                        "custCode": "test12"
                    },
                    {
                        "gameOrderId": 52,
                        "orderNo": "f81811e3201509021409969",
                        "custId": 57,
                        "transactionType": "enum_trans_type_ip",
                        "amount": 1,
                        "remarks": "",
                        "status": "enum_success_status_f",
                        "operatorBy": 57,
                        "orderTime": "Sep 2, 2015 2:09:45 PM",
                        "operatorTime": "Sep 2, 2015 2:09:45 PM",
                        "custCode": "test50"
                    },
                    {
                        "gameOrderId": 53,
                        "orderNo": "8fe3acd0201509021409696",
                        "custId": 57,
                        "transactionType": "enum_trans_type_ip",
                        "amount": 1,
                        "remarks": "",
                        "status": "enum_success_status_f",
                        "operatorBy": 57,
                        "orderTime": "Sep 2, 2015 2:10:41 PM",
                        "operatorTime": "Sep 2, 2015 2:10:41 PM",
                        "custCode": "test50"
                    },
                    {
                        "gameOrderId": 54,
                        "orderNo": "0fae3063201509021409480",
                        "custId": 57,
                        "transactionType": "enum_trans_type_iw",
                        "amount": 1,
                        "remarks": "",
                        "status": "enum_success_status_s",
                        "operatorBy": 57,
                        "orderTime": "Sep 2, 2015 2:11:29 PM",
                        "operatorTime": "Sep 2, 2015 2:11:29 PM",
                        "custCode": "test50"
                    }
                ]
            }
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
            "obj":{
                "unRead":7,
                "total":19,
                "content":[
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
            }
        });
    });

    app.get('/message/listOutbox', function (req, res) {
        res.json({
            "code": "200",
            "msg": "",
            "obj":{
                "unRead":7,
                "total":29,
                "content":[
                    {
                        "custMessageId": 1,
                        "messageTo": "VIP邀请",
                        "subject": "1111111111111111111111111111111",
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
            }
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

    app.post('/sidCustInfo/saveCustReceive', function (req, res) {
        res.json({
            "code": "200",
            "msg": ""
        });
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

};