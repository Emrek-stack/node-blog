var express = require('express');
var router = express.Router();
var userController = require('../../controllers/admin/userController');


//GET
router.get('/login', userController.loginGet);

//POST
router.post('/login/:number', userController.loginPost);

module.exports = router;