'use strict';

var chai = require('chai');
var superagent = require('superagent');

describe('User Api tests', function() {

  var URL = 'http://localhost:2015';
  var userObj = {
    firstName: 'Bob',
    lastName: 'Bobberson',
    password: 'bobbypass',
    email: 'bigbob@bobinc.com',
    role: 'admin'
  };
  var currentUserId;
  var modifiedUser = {
    firstName: 'Bob',
    lastName: 'Bobberson',
    password: 'bobbypass',
    email: 'bigbob@bobconstructionco.com',
    role: 'admin'
  }

  describe('CRUD actions', function() {

    describe('Create', function() {
      it('should create a user', function(done) {
        superagent.post(URL + '/user/create')
          .send(userObj)
          .end(function(err, res) {
            userObj = res.body;
            currentUserId = res.body._id;
            chai.expect(userObj).to.exist;
            chai.expect(userObj).to.not.be.undefined;
            chai.expect(userObj.firstName).to.equal(userObj.firstName);
            done();
          });
      });
    });

    describe('Read', function() {
      it('should read a user', function(done) {
        superagent.get(URL + '/user/read')
          .query({userId: currentUserId})
          .end(function(err, res) {
            if (err) console.log(err);
            var thisUser = res.body;
            chai.expect(thisUser).to.exist;
            chai.expect(thisUser).to.not.be.undefined;
            chai.expect(thisUser.firstName).to.equal(userObj.firstName);
            done();
          });
      });
    });

    describe('Update', function() {
      it('should update a company', function(done) {
        superagent.put(URL + '/user/update')
          .send({
            userObj: modifiedUser,
            userId: currentUserId
          })
          .end(function(err, res) {
            if (err) console.log(err);
            var thisUser = res.body
            chai.expect(thisUser).to.exist;
            chai.expect(thisUser).to.not.be.undefined;
            chai.expect(thisUser.email).to.equal(modifiedUser.email);
            done();
          });
      });
    });
  });
});
