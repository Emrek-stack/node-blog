var express = require('express');
var router = express.Router();
var userController = require('../../controllers/admin/userController');


router.route('/login')
    .get(userController.loginGet)
    .post(userController.loginPost);

//GET
//router.get('/login', userController.loginGet);


//POST
//router.post('/loginUser', userController.loginPost);

module.exports = router;