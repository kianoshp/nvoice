'use strict';

var express = require('express');
var path = require('path');

var swagger = function(app) {
  app.get('/swagger', express.static(path.join(__dirname, '../swagger-ui')));
};

module.exports = swagger;
