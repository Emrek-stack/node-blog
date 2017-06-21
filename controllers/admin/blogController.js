var article = require('../../model/article');

module.exports = {
    createGet: (req, res) => {
        res.render('admin/blog/create', {
            title: 'aa',
            layout: 'blogLayout.hbs'
        });
    },
    createPost: (req, res) => {
var post = new article({title: "My first post", author: "Yash Kumar", 
													body: "We want to make documentation obsolete"});

        res.send(req.body)
    }

}