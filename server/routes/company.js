var express = require('express');
var companyAPI = require('./../api/controllers/company');

var company = function(app){

  app.post('/company/create', function(req, res){
    var thisCompany = companyAPI.createCompanyObj(req);

    var newCompany = companyAPI.createCompany(thisCompany);

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(newCompany));
  });

  app.get('/company/read', function(req, res){
    var companyId = req.query.companyId || req.body.companyId;

    companyAPI.readCompany(companyId, function(err, company){
      res.json(company);
    });
  });
};

module.exports = company;
