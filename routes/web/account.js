module.exports = function (app) {
    app.get('/account', function (req, res) {
        res.render('account', {
            header: "account"
        });
    });
    app.get('/profile', function (req, res) {
        res.render('account_profile', {
            header: "profile"
        });
    });
    app.get('/safe', function (req, res) {
        res.render('account_safe', {
            header: "profile"
        });
    });
    app.get('/history', function (req, res) {
        res.render('account_history', {
            header: "history"
        });
    });
    app.get('/message', function (req, res) {
        res.render('account_message', {
            header: "message"
        });
    });
    app.get('/cashier', function (req, res) {
        res.render('account_cashier', {
            header: "cashier"
        });
    });
    app.get('/deposit', function (req, res) {
        res.render('account_deposit', {
            header: "cashier"
        });
    });
    app.get('/withdraw', function (req, res) {
        res.render('account_withdraw', {
            header: "cashier"
        });
    });
    app.get('/transfer', function (req, res) {
        res.render('account_transfer', {
            header: "cashier"
        });
    });
    app.get('/credits', function (req, res) {
        res.render('account_credits', {
            header: "credits"
        });
    });
};