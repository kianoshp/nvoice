var express = require('express');
var companyAPI = require('./../api/controllers/company');

var company = function(app){

  app.post('/company/create', function(req, res){
    var thisCompany = companyAPI.createCompanyObj(req);

    var newCompany = companyAPI.createCompany(thisCompany, function(err){
      if (err) throw err;
      res.end(JSON.stringify(newCompany));
    });

    res.writeHead(200, {
      'Content-Type': 'application/json'
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
