module.exports = {
    loginGet: (req, res) => {
        req.session.email = 'emre';
        res.render('admin/user/login', {
            title: 'aa',
            layout: ''
        });
    },
    loginPost: (req, res) => {
        console.log(req.session.email);
        res.json(req.body);
    }

}