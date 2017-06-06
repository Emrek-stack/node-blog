var db = require('../helper/db')

module.exports = {

    add: function(req, res) {
        res.render('item/additem');
    },

    create: function(req, res) {
        db.get().collection('items').save(req.body, (err, result) => {
            if (err) return console.log(err)
            res.redirect('/')
        })
    },

}