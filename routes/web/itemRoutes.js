var express = require('express');
var router = express.Router();
var itemController = require('../../controllers/web/itemController');

//GET
router.get('/add', itemController.add);

//POST
router.post('/add', itemController.create);

module.exports = router;
