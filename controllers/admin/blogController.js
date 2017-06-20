var ArticleSchema = require('../../model/article');

module.exports = {
    createGet: (req, res) => {
        res.render('admin/blog/create', {
            title: 'aa', layout: 'blogLayout.hbs'
        });
    },
    createPost: (req, res) => {
        var blog = new ArticleSchema.ArticleSchema();
        res.send(req.body)    
    }

}