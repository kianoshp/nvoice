/**
 * Default Configuration for all environments
 */
'use strict';

var path = require('path');
var _ = require('lodash');
var env = process.env.NODE_ENV || 'development';
var envConfig = require('./' + env);

// All configurations will extend these options
var defaults = {
  server: {
    // Port to run server on
    port: process.env.PORT || 2015,
    // https port
    securePort: process.env.SECUREPORT || 4443,
    // Host/URL to run server on
    host: process.env.HOSTNAME || '127.0.0.1',
    // Log level
    logLevel: 'dev',
    // Paths to ignore when redirecting back
    // to original location after logging in
    loginIgnorePaths: []
  },
  root: path.normalize(__dirname + '/../../..'),
  staticAssets: 'assets'  
};

// Export the config object based on the NODE_ENV
module.exports = _.merge(defaults, envConfig);
