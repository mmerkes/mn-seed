var express = require('express');
var router = express.Router();

var controller = require('../controllers/index');

/* GET home page. */
router.get('/', controller.getHome);

router.get('/item', controller.getItem);

module.exports = router;
