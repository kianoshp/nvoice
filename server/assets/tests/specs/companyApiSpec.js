'use strict';

var chai = require('chai');
var superagent = require('superagent');

describe('Company Api tests', function() {

  var URL = 'http://localhost:2015';
  var companyObj = {
    companyName: 'Bobs Buildings Inc.',
    isParent: true,
    address: {
      address1: '55 Bob Avenue',
      address2: 'Suite 707',
      city: 'Bobopolis',
      state: 'Florida',
      country: 'United States',
      zip: '09218'
    },
    clients: [],
    phone: '5184441234',
    fax: '',
    cell: '',
    email: 'questions@bobinc.com',
    created: Date.now()
  };
  var currentCompanyId;
  var modifiedCompany = {
    companyName: 'Bobs Construction Co.',
    isParent: true,
    address: {
      address1: '55 Bob Avenue',
      address2: 'Suite 707',
      city: 'Bobopolis',
      state: 'Florida',
      country: 'United States',
      zip: '09218'
    },
    clients: [],
    phone: '5184441234',
    fax: '',
    cell: '',
    email: 'questions@bobinc.com',
    created: Date.now()
  };

  describe('CRUD actions', function() {

    describe('Create', function() {
      it('should create a company', function(done) {
        superagent.post(URL + '/company/create')
          .send(companyObj)
          .end(function(err, res) {
            companyObj = res.body;
            currentCompanyId = res.body._id;
            chai.expect(companyObj).to.exist;
            chai.expect(companyObj).to.not.be.undefined;
            chai.expect(companyObj.companyName).to.equal(companyObj.companyName);
            done();
        });
      });
    });

    describe('Read', function() {
      it('should read a company', function(done) {
        superagent.get(URL + '/company/read')
          .query({companyId: currentCompanyId})
          .end(function(err, res) {
            if (err) console.log(err);
            var thisCompany = res.body;
            chai.expect(thisCompany).to.exist;
            chai.expect(thisCompany).to.not.be.undefined;
            chai.expect(thisCompany.companyName).to.equal(companyObj.companyName);
            done();
          });
      });
    });

    describe('Update', function() {
      it('should update a company', function(done) {
        superagent.put(URL + '/company/update')
          .send({
            companyObj: modifiedCompany,
            companyId: currentCompanyId
          })
          .end(function(err, res) {
            if (err) console.log(err);
            var thisCompany = res.body;

            chai.expect(thisCompany).to.exist;
            chai.expect(thisCompany).to.not.be.undefined;
            chai.expect(thisCompany.companyName).to.equal(modifiedCompany.companyName);
            done();
          });
      });
    });

    describe('Delete', function() {
      it('should delete a company', function(done) {
        superagent.del(URL + '/company/delete')
          .send({
            companyId: currentCompanyId
          })
          .end(function(err, res) {
            if (err) console.log(err)
            chai.expect(res.statusCode).to.equal(200);
            chai.expect(res.body).to.exist;
            chai.expect(res.body.status).to.equal('complete');
            chai.expect(res.body.isRemoved).to.be.true;
            done();
          });
      });
    });
  });
});
