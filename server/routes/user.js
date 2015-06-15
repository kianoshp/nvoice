'use strict';

var userAPI = require('./../api/controllers/users');

var user = function(app) {

  app.post('/user/create', function(req, res) {
    var thisUser = userAPI.createUserObj(req)

    var newUser = userAPI.createUser(thisUser, function(err, user) {
      if (err) throw err;

      res.json(user);
      res.end(JSON.stringify(newUser));
    });
  });
};

module.exports = user;
