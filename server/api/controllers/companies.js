var mongoose = require('mongoose');
var Company = require('../models/company');
var User = require('../models/user');
var userAPI = require('./users');
var _ = require('lodash');

var companyAPI = {
  companyObj: {
    company: {},
    user: {}
  },

  createCompanyObj: function(req){
    var companyObject = new Company({
      companyName: req.body.company.companyName,
      isParent: req.body.company.isParent,
      address: {
        address1: req.body.company.address.address1,
        address2: req.body.company.address.address2,
        city: req.body.company.address.city,
        state: req.body.company.address.state,
        country: req.body.company.address.country,
        zip: req.body.company.address.zip
      },
      clients: req.body.company.clients,
      phone: req.body.company.phone,
      fax: req.body.company.fax,
      cell: req.body.company.cell,
      email: req.body.company.email,
      created: Date.now()
    });

    return companyObject;
  },

  createCompany: function(companyObj, userObj, parentCompanyId){
    var self = this;

    companyObj.save(function(err){
      if (err) throw new Error('Company could not be created becase of ' + err.message);
      Company.findById(companyObj, function(err, doc){
        if (err) throw new Error('Company could not be created becase of ' + err.message);
        if (parentCompanyId){
          self.addClienToCompany(parentCompanyId, doc._id);
        }
      });
    });

    userAPI.createUser(userObj, function(err, user){
      if (err) {
        companyObj.remove({
          id: companyObj._id
        });
        return console.log(err);
      }

      companyAPI.companyObj.user = userObj;
    });

    companyAPI.companyObj.company = companyObj;

    return companyAPI;
  },

  readCompany: function(companyId, cb){
    Company.findById(companyId, function(err, doc){
      if (err) throw err;

      cb(null, doc);
    });
  },

  updateCompany: function(companyId, compandObj, options, cb){
    Company.findByIdAndUpdate(companyId, compandObj, options, function(err, doc){
      if (err) cb(err);

      cb(null, doc);
    });
  },

  deleteCompany: function(companyId){
    var self = this;
    User.remove({
      'companyId': companyId
    }, function(err){
      if (err) return false;
      // Remove clients
      self.getCompanyClients(companyId, function(err, clients){
        if (clients && clients.length > 0) {
          var ids = _.pluck(clients, '_id');
          User.remove({
            companyId: {
              $in: ids
            }
          }, function(err, data){
            Company.remove(clients, function(err, clients){
              // Remove company
              Company.remove({
                _id: companyId
              }, function(err){
                if (err) return false;

                return true;
              });
            });
          });
        } else {
          Company.remove({
            _id: companyId
          }, function(err){
            if (err) return false;

            return true;
          });
        }
      });
    });

    return true;
  },

  addClienToCompany: function(companyId, clientId){
    Company.update({
      _id: companyId
    }, {
      $push: {
        client: clientId
      }
    }, {
        upsert: true
    }, function(err, data){
      if (err) throw err;
      return data;
    });
  },

  getCompanyClients: function(companyId, cb){
    Company.find({
      _id: companyId
    }, 'client', function(err, data){
      if(err) return cb(err);

      var clientIdArr = data[0].client;
      Company.find({
        _id: {
          $in: clientIdArr
        }
      }, function(err, companies){
        if(err) return cb(err);

        cb(null, companies);
      });
    });
  },

  searchClients: function(companyId, searchExp, cb){
    Company.find({
      _id: companyId
    }, 'client', function(err, data){
      if(err) throw err;

      var clientIdArr = data[0].client;
      var regEx = new RegEx(searchExp, 'i');
      Company.find({
        _id: {
          $in: clientIdArr
        }, companyName: regEx
      }, function(err, companies){
        if(err) cb(err);

        cb(null, companies);
      });
    });
  }
};


module.exports.CompanySchema = Company;
module.exports.UserSchema = User;
module.exports.companyAPI = companyAPI;
