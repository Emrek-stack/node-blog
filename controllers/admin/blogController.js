

module.exports = {
    createGet: (req, res) => {
        res.render('admin/blog/create', {
            title: 'aa', layout: 'blogLayout.hbs'
        });
    },
    createPost: (req, res) => {
        res.send(req.body)    
    }

}