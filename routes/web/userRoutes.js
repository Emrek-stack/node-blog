var express = require('express');
var router = express.Router();
var userController = require('../../controllers/web/usersController');

//GET
router.post('/login', userController.login);

module.exports = router;