'use strict';

var express = require('express');
var path = require('path');

var swagger = function(app) {
  app.get('/server/api/docs/swagger.json', express.static(path.join(__dirname, '../swagger-ui/dist')));
};

module.exports = swagger;
