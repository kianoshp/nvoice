/**
 * Node Server Configuration
 */
'use strict';

// Module dependencies.
var fs = require('fs');
var https = require('https');
var http = require('http');
var express = require('express');
var db = require('./server/api/models/db.js');

// Add coloring for console output
require('colors');

// self signed cert credentials
var credentials = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'testing'
};

// Create Express server.
var app = express();

// ignoring the self signed certs in dev environment
if(app.get('env') === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// Express configuration
require('./server/config/express')(app, express);

// Start Express server.
https.createServer(credentials, app)
  .listen(app.get('securePort'), function() {
    console.log('✔ Express server listening on port '.green + '%d'.blue + ' in '.green + '%s'.blue + ' mode'.green, app.get('securePort'), app.get('env'));
});

// Set up HTTP redirect
var httpApp = express();
var httpRouter = express.Router();

httpApp.use('*', httpRouter);

httpRouter.get('*', function(req, res){
  var host = req.get('Host');

  host = host.replace(/:\d+$/, ":"+app.get('securePort'));

  var destination = ['https://', host, req.url].join('');
  return res.redirect(destination);
});

var httpServer = http.createServer(httpApp);
httpServer.listen(app.get('port'));

module.exports = app;
