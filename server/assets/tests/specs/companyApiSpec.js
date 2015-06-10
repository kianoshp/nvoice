var chai = require('chai');
var mongoose = require('mongoose');
var superagent = require('superagent');
var request = require('supertest');
var app = require('../../../../app');

describe('Company Api tests', function(){

  var URL = 'https://localhost:4443';
  var companyObj = {
    companyName: 'Bobs Buildings Inc.',
    isParent: true,
    address: {
      address1: "55 Bob Avenue",
      address2: "Suite 707",
      city: "Bobopolis",
      state: "Florida",
      country: "United States",
      zip: "09218"
    },
    clients: [],
    phone: "5184441234",
    fax: '',
    cell: '',
    email: "questions@bobinc.com",
    created: Date.now()
  };
  var clientObj = {
    company: {
      companyName: 'Randys Emporium',
      isParent: false,
      address: {
        address1: "1 Emporium Way",
        address2: "",
        city: "Bobopolis",
        state: "Florida",
        country: "United States",
        zip: "09218"
      },
      phone: "5182225190",
      email: "randy@gmail.com",
      created: Date.now()
    }
  };
  var currentCompanyId;
  var currentClientId;
  var modifiedCompanyObj = {
    companyName: 'Bobs Buildings Inc.',
    isParent: true,
    address: {
      address1: "101 Bob Avenue",
      address2: "Suite 1000",
      city: "Bobopolis",
      state: "Florida",
      country: "United States",
      zip: "09218"
    },
    clients: [],
    phone: "5184441234",
    email: "questions@bobinc.com",
    created: Date.now()
  };

  describe('CRUD actions', function(){

    describe('Create', function(){
      it('should create a company', function(done){
        superagent.post(URL + '/company/create')
          .send(companyObj)
          .end(function(err, res){
            companyObj = res.body.company;
            currentCompanyId = res.body.company._id;
            chai.expect(companyObj).to.exist;
            chai.expect(companyObj).to.not.be.undefined;
            chai.expect(companyObj.companyName).to.equal(companyObj.companyName);
            done();
        });
      });
    });

    describe('Read', function(){
      it('should read a company', function(done){
        superagent.get(URL + '/company/read')
          .query({companyId: currentCompanyId})
          .end(function(err, res){
            if(err) console.log(err);
            var thisCompany = res.body;
            chai.expect(thisCompany).to.exist;
            chai.expect(thisCompany).to.not.be.undefined;
            chai.expect(thisCompany.companyName).to.equal(companyObj.companyName);
            done();
          });
      });
    });
  });
});
