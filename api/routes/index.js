var express = require('express'),
    router = express.Router(),
    MongoClient = require('mongodb').MongoClient,
    mongoUrl = 'mongodb://c71.lighthouse.1.mongolayer.com:10071/quake';

MongoClient.connect(mongoUrl, function (err, db) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  db.authenticate('manuj', 'share2give', function(err, result) {
  	var controller = require('../controllers/index')(db);

  	router.get('/item', controller.getItem);
  });
});


module.exports = router;
