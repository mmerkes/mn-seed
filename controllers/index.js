var request = require('request');

module.exports.getHome = function(req, res, next) {
  return res.render('home', {
    title: 'MyNeighbor Bitches!',
    message: 'Welcome Home!'
  });
};

module.exports.getItem = function (req, res, next) {
  request('http://localhost:3000/api/item', function (err, response, body) {
    if (err) {
      return res.status(response.status).send(err);
    }

    return res.render('item', {
      title: 'Item',
      item: JSON.parse(body)
    });
  });
};