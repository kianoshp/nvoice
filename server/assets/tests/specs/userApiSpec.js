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
    company: '',
    role: 'admin'
  };

  describe('CRUD actions', function() {

    describe('Create', function() {
      it('should create a user', function(done) {
        superagent.post(URL + '/user/create')
          .send(userObj)
          .end(function(err, res) {
            userObj = res.body;
            chai.expect(userObj).to.exist;
            chai.expect(userObj).to.not.be.undefined;
            chai.expect(userObj.firstName).to.equal(userObj.firstName);
            done();
        });
      })
    })
  })
})
