'use strict';

var Company = require('../models/company');

var companyAPI = {
  company: {},
  createCompanyObj: function(req) {
    var companyObject = new Company({
      companyName: req.body.companyName,
      isParent: req.body.isParent,
      address: {
        address1: req.body.address.address1,
        address2: req.body.address.address2,
        city: req.body.address.city,
        state: req.body.address.state,
        country: req.body.address.country,
        zip: req.body.address.zip
      },
      clients: req.body.clients,
      phone: req.body.phone,
      fax: req.body.fax,
      cell: req.body.cell,
      email: req.body.email,
      created: Date.now()
    });

    return companyObject;
  },

  createCompany: function(companyObj, cb) {
    companyObj.save(function(err) {

      cb(err, companyObj);
    });
  },

  readCompany: function(companyId, cb) {
    Company.findById(companyId, function(err, doc) {

      cb(err, doc);
    });
  },

  updateCompany: function(companyId, companyObj, options, cb) {
    Company.findByIdAndUpdate(companyId, companyObj,
      options, function(err, doc) {

        cb(err, doc);
      });
  },

  deleteCompany: function(companyId) {
    Company.remove({_id: companyId}, function(err) {
      if (err) {
        return false;
      }

      return true;
    });
  }
};

module.exports = companyAPI;
