'use strict';

var request = require('superagent');

var main = function(app) {
  app.get('/main', function(req, res) {
    res.render('main');
  });
};

module.exports = main;
