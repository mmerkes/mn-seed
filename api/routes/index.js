var express = require('express'),
    router = express.Router(),
    MongoClient = require('mongodb').MongoClient,
    mongoUrl = 'mongodb://localhost:27017/test';

MongoClient.connect(mongoUrl, function (err, db) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  var controller = require('../controllers/index')(db);

  router.get('/item', controller.getItem);
});

module.exports = router;
