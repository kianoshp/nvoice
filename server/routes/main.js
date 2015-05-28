'use strict';

var request = require('superagent');

var main = function(app) {
  app.get('/main', function(req, res) {
    res.render('main');
  });

  // app.get('/resourceTree', function(req, res) {
  //   request
  //     .get('https://localhost:8443/elements/atlas/resourceTree')
  //     .set('JSESSIONID', req.session.jSession)
  //     .end(function(err, response) {
  //       console.log(response);

  //       res.send(200);
  //     });
  // });
};

module.exports = main;
