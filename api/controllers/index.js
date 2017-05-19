'use strict';
var ObjectID = require('mongodb').ObjectID

module.exports = function (db) {
  var cols = {
    items: db.collection('items')
  };

  return {
    getItem: function (req, res, next) {
      var id = req.query.id;
      console.log(id);
      cols.items.find({_id: new ObjectID(id)}).limit(1).toArray( function (err, docs) {
        if (err) {
          return res.status(500).send('Oh, fuck!');
        }

        console.log(docs);
        if (!docs || docs.length === 0) {
          return res.status(404).send('Doh! It\'s gone');
        }
        console.log(typeof docs[0]);
        return res.json(docs[0]);
      });
    }
  }
};