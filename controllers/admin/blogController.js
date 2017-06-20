

module.exports = {
    createGet: (req, res) => {
        res.render('web/home/login', {
            title: 'aa', layout: 'blogLayout.hbs'
        });
    },
    createPost: (req, res) => {
        res.send(req.body)    
    }

}