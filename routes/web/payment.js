var _=require("underscore");
module.exports = function (app) {

    function mid(obj){
        return _.extend({
            curAccount:"100.00"
        },app.locals.middle,obj)
    }

    app.get('/payment/deposit', function (req, res) {
        res.render('payment/deposit', mid({
            "result":{
                "paySetting": [
                    "02CD",
                    "02TP",
                    "02AI",
                    "02PP",
                    "02MP",
                ],
                "item": [
                    {
                        "quotaSetting": {
                            "maxDialyMoney": 3,
                            "minMoney": 1,
                            "maxPending": 0,
                            "maxMoney": 2000
                        },
                        "bankList": {
                            "bankCode": [
                                "HXB",
                                "GDB",
                                "ICBC"
                            ],
                            "bankCodeByPayList": [
                                "3050",
                                "3036",
                                "3005"
                            ]
                        }
                    },
                    {
                        "quotaSetting": {
                            "maxDialyMoney": 3,
                            "minMoney": 1,
                            "maxPending": 0,
                            "maxMoney": 2000
                        },
                        "bankList": {
                            "bankCode": [
                                "ICBC",
                                "CMB",
                                "CEB",
                                "CMBC",
                                "SPDB",
                                "CCB",
                                "ABC",
                                "BOS",
                                "HSBC",
                                "BOC",
                                "PSBC",
                                "PAB",
                                "CCB",
                                "CIB"
                            ],
                            "bankCodeByPayList": [
                                "3002",
                                "3001",
                                "3022",
                                "3006",
                                "3004",
                                "3003",
                                "3005",
                                "3059",
                                "0",
                                "3026",
                                "3038",
                                "3035",
                                "3039",
                                "3009"
                            ]
                        }
                    },
                    {
                        "quotaSetting": {
                            "maxDialyMoney": 40000,
                            "minMoney": 1000,
                            "maxPending": 80000,
                            "maxMoney": 20000
                        },
                        "bankList": {
                            "bankCode": [
                                "BCM"
                            ],
                            "bankCodeByPayList": [
                                "3020"
                            ]
                        }
                    },
                    {},
                    {}
                ]
            }
        }));
    });

    app.get('/payment/withdraw', function (req, res) {
        res.render('payment/withdraw', mid({
            isSetPwd:true,
            isBindBank:true,
            SidQuotaSetting:{
                minMoney: "100", maxMoney: "10000", maxPending: "", maxDialyMoney: ""
            },
            listBanks:[
                {
                    "bankId": 2,
                    "bankName": "中国工商银行",
                    "bankCode": "ICBC",
                    "country": "sys_code.country.cn",
                    "currency": "sys_code.currency.cny",
                    "nativeName": "中国、、",
                    "url": "www.icbc99999.com",
                    "displayOrder": 0,
                    "status": "0",
                    "createdBy": 234235,
                    "createdTime": "Jun 18, 2015 11:41:56 PM",
                    "updatedBy": 2342432,
                    "updatedTime": "Aug 19, 2015 4:12:30 PM",
                    "operator": "fas",
                    "iconUrl": ""
                },
                {
                    "bankId": 22,
                    "bankName": "招商银行",
                    "bankCode": "CMB",
                    "country": "ID",
                    "currency": "IDR",
                    "nativeName": "kkkkkkkk",
                    "url": "kkkkkkkkkk",
                    "displayOrder": 0,
                    "status": "1",
                    "createdBy": 234235,
                    "createdTime": "Jun 24, 2015 5:35:11 PM",
                    "updatedBy": 2342432,
                    "updatedTime": "Aug 20, 2015 10:25:55 AM",
                    "operator": "fas",
                    "iconUrl": ""
                },
                {
                    "bankId": 24,
                    "bankName": "民生银行",
                    "bankCode": "CMBC",
                    "country": "ID",
                    "currency": "IDR",
                    "nativeName": "菲律宾",
                    "url": "www.flbcb.ph",
                    "displayOrder": 0,
                    "status": "1",
                    "createdBy": 234235,
                    "createdTime": "Jun 25, 2015 12:57:58 PM",
                    "updatedBy": 2342432,
                    "updatedTime": "Aug 20, 2015 10:26:10 AM",
                    "operator": "fas",
                    "iconUrl": ""
                },
                {
                    "bankId": 25,
                    "bankName": "浦发银行",
                    "bankCode": "SPDB",
                    "country": "ID",
                    "currency": "IDR",
                    "nativeName": "dfsg",
                    "url": "sdfgdsf",
                    "displayOrder": 0,
                    "status": "1",
                    "createdBy": 234235,
                    "createdTime": "Jun 25, 2015 2:05:29 PM",
                    "updatedBy": 2342432,
                    "updatedTime": "Aug 20, 2015 10:39:19 AM",
                    "operator": "fas",
                    "iconUrl": ""
                },
                {
                    "bankId": 26,
                    "bankName": "交通银行",
                    "bankCode": "BCM",
                    "country": "ID",
                    "currency": "IDR",
                    "nativeName": "sgf",
                    "url": "df",
                    "displayOrder": 0,
                    "status": "1",
                    "createdBy": 234235,
                    "createdTime": "Jun 25, 2015 4:06:18 PM",
                    "updatedBy": 2342432,
                    "updatedTime": "Aug 20, 2015 10:26:35 AM",
                    "operator": "fas",
                    "iconUrl": ""
                },
                {
                    "bankId": 27,
                    "bankName": "中国建设银行",
                    "bankCode": "CCB",
                    "country": "ID",
                    "currency": "IDR",
                    "nativeName": "dddd",
                    "url": "ddddddddd",
                    "displayOrder": 0,
                    "status": "1",
                    "createdBy": 234235,
                    "createdTime": "Jun 25, 2015 4:06:45 PM",
                    "updatedBy": 2342432,
                    "updatedTime": "Aug 20, 2015 10:26:46 AM",
                    "operator": "fas",
                    "iconUrl": ""
                }
                ,
                {
                    "bankId": 147,
                    "bankName": "花旗银行",
                    "bankCode": "CTB",
                    "country": "",
                    "currency": "",
                    "nativeName": "",
                    "url": "",
                    "displayOrder": 0,
                    "status": "",
                    "createdBy": 0,
                    "createdTime": "Jul 14, 2015 10:44:08 AM",
                    "updatedBy": 0,
                    "updatedTime": "Aug 20, 2015 10:47:56 AM",
                    "operator": "",
                    "iconUrl": ""
                }
            ],
            sidCustBankacct:[
                {
                    "custBankacctId": 1,
                    "bankName": "中国工商银行",
                    "realName": "王小智",
                    "custBankacctNo": "90909090",
                    "bankProvince": "四川省",
                    "bankCity": "成都市井 ",
                    "bankAddr": "xxx",
                    "createdTime": "Aug 27, 2015 312 PM",
                    "remarks": "sXXX"
                },
                {
                    "custBankacctId": 2,
                    "bankName": "中国建设银行",
                    "realName": "王小智",
                    "custBankacctNo": "90909090",
                    "bankProvince": "成都省",
                    "bankCity": "四川省 ",
                    "bankAddr": "xxx",
                    "createdTime": "Aug 27, 2015 312 PM",
                    "remarks": "sXXX"
                }
            ]
        }));
    });

    app.get('/payment/transfer', function (req, res) {
        res.render('payment/transfer', mid({
            blance: {"curAccount": "761.00", "pt": "0.00", "w88": "121.00"}
        }));
    });

    app.get('/payment/statement', function (req, res) {
        res.render('payment/statement', mid({

        }));
    });

    app.post('/sidCustInfo/savPayPassword', function (req, res) {
        res.json({
            "code": "200",
            "msg": ""
        });
    });

    app.post('/sidCustInfo/bindBank', function (req, res) {
        res.json({
            "code": "200",
            "msg": ""
        });
    });


    app.post('/cashier/transfer', function (req, res) {
        res.json({
            "code": "200",
            "msg": ""
        });
    });

    app.post('/cashier/withdraw', function (req, res) {
        res.json({
            "code": "200",
            "msg": ""
        });
    });

    app.get('/cashier/transRecords', function (req, res) {
        res.json({
            "code": "200",
            "msg": "",
            "obj":{
                "total":29,
                "content":[

                    {
                        "balanceLogId": 36,
                        "custId": 2,
                        "operator": 2,
                        "fundsType": "03FR",
                        "acctType": "AT0H",
                        "balanceType": "03IX",
                        "currency": "RMB",
                        "effTime": "Aug 27, 2015 4:40:29 PM",
                        "expTime": "Aug 27, 2015 4:40:29 PM",
                        "beforeAmount": 1200,
                        "afterAmount": 2000,
                        "amount": 800,
                        "status": "00A",
                        "statusDate": "Aug 27, 2015 4:40:29 PM",
                        "billNo": "xxxx2015090909",
                        "operatorTime": "Aug 27, 2015 4:40:29 PM"
                    },
                    {
                        "balanceLogId": 57,
                        "custId": 2,
                        "operator": 2,
                        "fundsType": "03FW",
                        "acctType": "AT0H",
                        "balanceType": "03IX",
                        "currency": "RMB",
                        "effTime": "Aug 27, 2015 4:40:29 PM",
                        "expTime": "Aug 27, 2015 4:40:29 PM",
                        "beforeAmount": 1200,
                        "afterAmount": 2000,
                        "amount": 800,
                        "status": "00H",
                        "statusDate": "Aug 27, 2015 4:40:29 PM",
                        "billNo": "xxxx2015080808",
                        "operatorTime": "Aug 27, 2015 4:40:29 PM"
                    }
                ]
            }
        });
    });


    app.get('/cashier/listProvince', function (req, res) {
        res.json({
            "code": "200",
            "msg": "",
            "obj":[
                {
                    provinceid:1,
                    provincename:"北京"
                },
                {
                    provinceid:2,
                    provincename:"广东"
                }
            ]
        });
    });

    app.get('/cashier/listCity', function (req, res) {
        res.json({
            "code": "200",
            "msg": "",
            "obj":[
                {
                    cityid:1,
                    cityname:"北京1"
                },
                {
                    cityid:2,
                    cityname:"广州"
                },
                {
                    cityid:3,
                    cityname:"深圳"
                }
            ]
        });
    });

    app.get('/cashier/listDistrict', function (req, res) {
        res.json({
            "code": "200",
            "msg": "",
            "obj":[
                {
                    districtid:1,
                    districtname:"1区"
                },
                {
                    districtid:2,
                    districtname:"2区"
                },
                {
                    districtid:3,
                    districtname:"3区"
                },
                {
                    districtid:4,
                    districtname:"4区"
                }
            ]
        });
    });

    app.post('/cashier/deposit', function (req, res) {
        res.json({
            "code": "200",
            "msg": "",
            "obj":"http://www.baidu.com"
        });
    });

    app.post('/cashier/companyDeposit', function (req, res) {
        res.json({
            "code": "200",
            "msg": ""
        });
    });


    app.get('/cashier/getFundInfo', function (req, res) {
        res.json({
            "code": "200",
            "msg": "",
            "obj": {
                "orderNo":"620124",
                "createdTime":"1999",
                "fundInAccount":{
                    accountName:"李小惠",
                    accountNo:"6214830290734838",
                    bankBranch:"陕西西安"
                }

            }
        });
    });

    app.get('/cashier/fresh', function (req, res) {
        res.json({
            "code": "200",
            "msg": "",
            "obj": "88.88"
        });
    });

    app.get('/cashier/billStatus', function (req, res) {
        res.send("true")
    });

    app.get('/cashier/recordsDetail', function (req, res) {
        res.json({
            "code": "200",
            "msg": "",
            "obj": {
                "balanceLogId": 36,
                "custId": 2,
                "operator": 2,
                "fundsType": "03FR",
                "acctType": "AT0H",
                "balanceType": "03IX",
                "currency": "RMB",
                "effTime": "Aug 27, 2015 4:40:29 PM",
                "expTime": "Aug 27, 2015 4:40:29 PM",
                "beforeAmount": 1200,
                "afterAmount": 2000,
                "amount": 800,
                "status": "00A",
                "statusDate": "Aug 27, 2015 4:40:29 PM",
                "billNo": "xxxx2015090909",
                "operatorTime": "Aug 27, 2015 4:40:29 PM"
            }
        });
    });

};