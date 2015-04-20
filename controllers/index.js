var request = require('request')
  , ObjectID = require('mongodb').ObjectID;

module.exports = function (db) {
  var cols = {
    items: db.collection('items'),
    requests: db.collection('shoutouts'),
    accounts: db.collection('accounts')
  };

  return {
    getHome: function(req, res, next) {
      return res.render('home', {
        title: 'MyNeighbor Bitches!',
        message: 'Welcome Home!'
      });
    },

    getItem: function (req, res, next) {
      var id = req.query.id;
      cols.items.find({_id: new ObjectID(id)}).limit(1).toArray( function (err, docs) {
        if (err) {
          return res.status(500).send('Oh, fuck!');
        }

        if (!docs || docs.length === 0) {
          return res.status(404).send('Doh! It\'s gone');
        }

        var og = {
          'title': docs[0].name,
          'description': docs[0].description,
          'image': docs[0].image
        };

        var redirectURL = "myneighbor://main/item/" + id;
        console.log("red = " + redirectURL);
        cols.accounts.find( {_id: new ObjectID(docs[0]._lender)} ).toArray(function(e,userDocs) {
          return res.render('item', {
            console.log("userDocs = " + userDocs[0]);
            title: docs[0].name,
            item: docs[0],
            user: userDocs[0],
            redirectURL: redirectURL,
            og: og
          });
        });
      });
    },

    getRequest: function (req, res, next) {
      var id = req.query.id;
      cols.requests.find({_id: new ObjectID(id)}).limit(1).toArray( function (err, docs) {
        if (err) {
          return res.status(500).send('Oh, fuck!');
        }
        
        if (!docs || docs.length === 0) {
          return res.status(404).send('Doh! It\'s gone');
        }

        var og = {
          'title': docs[0].title,
          'description': docs[0].description,
          'image': docs[0].image
        };

        var redirectURL = "myneighbor://main/shoutout/" + id;
        console.log("red = " + redirectURL);
        cols.accounts.find( {_id: new ObjectID(docs[0]._borrower)} ).toArray(function(e,userDocs) {
          return res.render('request', {
            console.log("userDocs = " + userDocs[0]);
            title: docs[0].title,
            request: docs[0],
            user: userDocs[0],
            redirectURL: redirectURL,
            og: og
          });
        });
      });
    }    
  }
};