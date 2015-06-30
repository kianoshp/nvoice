'use strict';

var userAPI = require('./../api/controllers/users');

var user = function(app) {

  app.post('/user/create', function(req, res) {
    var thisUser = userAPI.createUserObj(req);

    userAPI.createUser(thisUser, function(err, user, next) {
      if (err) {
        next(err);
      }

      res.json(user);
    });
  });

  app.get('/user/read', function(req, res) {
    var userId = req.query.userId || req.body.userId;

    userAPI.readUser(userId, function(err, user, next) {
      if (err) {
        next(err);
      }

      res.json(user);
    });
  });

  app.put('/user/update', function(req, res) {
    userAPI.updateUser(req.body.userId, req.body.userObj,
     {new: true}, function(err, user, next) {
        if (err) {
          next(err);
        }

        res.json(user);
      });
  });

  app.delete('/user/delete', function(req, res) {
    userAPI.deleteUser(req.body.userId);
    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'complete', isRemoved: true});
  });
};

module.exports = user;
