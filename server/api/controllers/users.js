'use strict';

var User = require('../models/user');

var userAPI = {
  user: {},

  createUserObj: function(req) {
    var userObject = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      company: req.body.company,
      role: req.body.role
    });

    return userObject
  },

  createUser: function(userObject, cb) {
    userObject.save(function(err) {

      cb(err, doc);
    });
  },
};
