var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');


//GET
router.get('/list', function(req, res) {
    indexController.list(req, res);
});

// router.post('/create', indexController.create);

// router.post('/update', indexController.update);

// router.get('/getById', indexController.getById);

// router.get('/updateCallInfo', indexController.updateCallInfo);

// router.post('/upload', indexController.upload);

router.get('/', indexController.index);

module.exports = router;