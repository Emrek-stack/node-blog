var express = require('express');
var router = express.Router();
var blogController = require('../../controllers/admin/blogController');


//GET
router.get('/create', blogController.create);

//router.post('/create', blogController.create);

// router.post('/update', indexController.update);

// router.get('/getById', indexController.getById);

// router.get('/updateCallInfo', indexController.updateCallInfo);

// router.post('/upload', indexController.upload);

//router.get('/', blogController.index);

module.exports = router;