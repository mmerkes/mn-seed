'use strict';

module.exports = function (db) {
  var cols = {
    items: db.collection('items')
  };

  return {
    getItem: function (req, res, next) {
      cols.items.find({}).limit(1).toArray( function (err, docs) {
        if (err) {
          return res.status(500).send('Oh, fuck!');
        }

        if (!docs || docs.length === 0) {
          return res.status(404).send('Doh! It\'s gone');
        }
        console.log(typeof docs[0]);
        return res.json(docs[0]);
      });
    }
  }
};