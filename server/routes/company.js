var express = require('express');
var companyAPI = require('./../api/controllers/company');

var company = function(app){

  app.post('/company/create', function(req, res){
    var thisCompany = companyAPI.createCompanyObj(req);

    var newCompany = companyAPI.createCompany(thisCompany, function(err, companyObj){
      if (err) throw err;

      res.json(companyObj);
      res.end(JSON.stringify(newCompany));
    });
  });

  app.get('/company/read', function(req, res){
    var companyId = req.query.companyId || req.body.companyId;

    companyAPI.readCompany(companyId, function(err, company){
      if (err) throw err;
      res.json(company);
    });
  });
};

module.exports = company;
