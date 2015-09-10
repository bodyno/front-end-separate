var fs = require("fs");

module.exports = function (app) {
    app.get('/validateCode', function (req, res) {
        fs.readFile("src/static/images/temp_code.jpg", "binary", function (error, result) {
            res.end(result, 'binary')
        });
    });

    app.get('/checkValidateCode', function (req, res) {
        if (req.param("validateCode") == "1234") {
            res.end("true")
        } else {
            res.end("false")
        }
    });

    app.get('/payCode', function (req, res) {
        fs.readFile("src/static/images/temp_code2.jpg", "binary", function (error, result) {
            res.end(result, 'binary')
        });
    });

    app.get('/checkPayCode', function (req, res) {
        if (req.param("validCode") == "1234") {
            res.end("true")
        } else {
            res.end("false")
        }
    });

};