'use strict';

/**
 * Index Controller
 */
var indexController = function(req, res) {
  // Render index.html to allow application to handle routing
  res.render('index');
};

module.exports = {
  index: indexController
};
