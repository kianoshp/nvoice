var mongoose = require('mongoose');
var Company = require('../models/company');
var _ = require('lodash');

var companyAPI = {
  company: {},

  createCompanyObj: function(req, cb){
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

  createCompany: function(companyObj, cb){
    companyObj.save(function(err){
      if (err) throw err;

      cb(null);
    });

    companyAPI.company = companyObj;
    return companyAPI;
  },

  readCompany: function(companyId, cb){
    Company.findById(companyId, function(err, doc){
      if (err) throw err;

      cb(null, doc);
    });
  },
};


module.exports.CompanySchema = Company;
module.exports = companyAPI;
