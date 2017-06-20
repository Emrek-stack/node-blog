module.exports = {
    loginGet: (req, res) => {
        res.render('admin/user/login', {
            title: 'aa',
            layout: ''
        });
    },
    loginPost: (req, res) => {

        res.send(req.body.username + ' ' + req.body.password);
    }

}