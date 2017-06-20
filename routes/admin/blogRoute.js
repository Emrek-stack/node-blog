var express = require('express');
var router = express.Router();
var authChecker  = require('../../middleware/auth')
var blogController = require('../../controllers/admin/blogController');


//GET
router.route('/create')
    .get(authChecker.authChecker, blogController.createGet)
    .post(authChecker.authChecker, blogController.createPost);

// router.get('/getById', indexController.getById);


module.exports = router;