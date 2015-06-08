var chai = require('chai');
var mongoose = require('mongoose');
var superagent = require('superagent');

describe('Company Api tests', function(){

  var URL = 'https://localhost:4443';
  var companyObj = {
    company: {
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
      email: "questions@bobinc.com",
      created: Date.now()
    },
    user: {
      firstName: "Bob",
      middleInitial: "",
      lastName: "Bableberg",
      password: "password",
      email: "bigbob@bobinc.com",
      phone: "5183214567",
      role: "administrator",
      mainContact: true
    }
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
    },
    user: {
      firstName: "Randell",
      middleInitial: "",
      lastName: "Robertson",
      password: "password",
      email: "randy@gmail",
      phone: "5181110101",
      role: "administrator",
      mainContact: true
    }
  };
  companyObj = {};
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
            companyObj = res.body.companyObj;
            currentCompanyId = res.body.company._id;
            chai.expect(companyObject).to.exist;
            chai.expect(companyObject).to.not.be.undefined;
            chai.expect(companyObject.company.companyName).to.equal(companyObject.company.companyName);
            done();
          });
      });
    });

    describe('Client services', function(){
      it('should create a client', function(done){
        clientObj.parentCompany = companyObj._id;
        superagent.post(URL + '/company/create')
          .send(clientObj)
          .send({parentCompanyId: currentCompanyId})
          .end(function(err, res){
            if(err) return console.log(err);

            var clientObj = res.body.companyObj;
            currentClientId = clientObject._id;
            chai.expect(clientObject).to.exist;
            chai.expect(clientObject).to.not.be.undefined;
            chai.expect(clientObject.company.companyName).to.equal(clientObj.company.companyName);
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
            chai.expect(thisCompany.companyName).to.equal(companyObj.company.companyName);
            done();
          });
      });
    });

    describe('Update', function(){
      it('should update a company', function(done){
        superagent.put(URL + '/company/update')
          .send({
            companyObj: modifiedCompanyObj,
            compandyId: currentCompanyId
          })
          .end(function(err, res){
            if(err) return console.log(err);

            var thisCompany = res.body;
            chai.expect(thisCompany).to.exist;
            chai.expect(thisCompany).to.not.be.undefined;
            chai.expect(thisCompany.address.address1).to.equal(modifiedCompanyObj.address.address1);
            chai.expect(thisCompany.address.address2).to.equal(modifiedCompanyObj.address.address2);
            done();
          });
      });
    });

    describe('Delete', function(){
      it('should delete a company and its clients and users', function(done){
        superagent.del(URL + '/company/delete')
          .send({
            companyId: currentCompanyId
          })
          .end(function(err, res){
            if(err) console.log(err);

            chai.expect(res.body).to.exist;
            chai.expect(res.body.status).to.equal('complete');
            chai.expect(res.body.isRemoved).to.be.true;
            done();
          });
      });
    });
  });
});
