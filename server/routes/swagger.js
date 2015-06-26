'use strict';

var express = require('express');
var path = require('path');

var swagger = function(app) {
  app.get('/server/api/docs/swagger.json', express.static('../swagger-ui/dist'));
};

module.exports = swagger;
