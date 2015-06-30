'use strict';

var companyAPI = require('./../api/controllers/company');

var company = function(app) {

  app.post('/company/create', function(req, res) {
    var thisCompany = companyAPI.createCompanyObj(req);

    companyAPI.createCompany(thisCompany, function(err, companyObj, next) {
      if (err) {
        next(err);
      }

      res.json(companyObj);
    });
  });

  app.get('/company/read', function(req, res) {
    var companyId = req.query.companyId || req.body.companyId;

    companyAPI.readCompany(companyId, function(err, company, next) {
      if (err) {
        next(err);
      }

      res.json(company);
    });
  });

  app.put('/company/update', function(req, res) {
    companyAPI.updateCompany(req.body.companyId,
      req.body.companyObj, {new: true}, function(err, company, next) {
      if (err) {
        next(err);
      }

      res.json(company);
    });
  });

  app.delete('/company/delete', function(req, res) {
    companyAPI.deleteCompany(req.body.companyId);
    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'complete', isRemoved: true});
  });
};

module.exports = company;
