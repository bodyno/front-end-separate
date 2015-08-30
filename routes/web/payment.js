var _=require("underscore");
module.exports = function (app) {

    function mid(obj){
        return _.extend({
            curAccount:"100.00"
        },app.locals.middle,obj)
    }

    app.get('/payment/deposit', function (req, res) {
        res.render('payment/deposit', mid({

        }));
    });

    app.get('/payment/withdraw', function (req, res) {
        res.render('payment/withdraw', mid({
            isSetPwd:true,
            isBindBank:true
        }));
    });

    app.get('/payment/transfer', function (req, res) {
        res.render('payment/transfer', mid({

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
};