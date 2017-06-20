module.exports = {
    loginGet: (req, res) => {
        res.render('admin/user/login', {
            title: 'aa',
            layout: ''
        });
    },
    loginPost: (req, res) => {

        res.render('admin/user/login2');
    }

}