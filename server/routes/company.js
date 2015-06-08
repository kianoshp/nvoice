var express = require('express');
var companyAPI = require('./../api/controllers/companies');
var userAPI = require('./../api/controllers/users');
var router = express.Router();

router.post('/company/create', function(req, res){
  var thisCompany = companyAPI.createCompanyObj(req);
  var thisUser = userAPI.createUserObj(req, thisCompany);
  var parentCompanyId = req.body.parentCompanyId || null;

  var newCompany = companyAPI.createCompany(thisCompany, thisUser, parentCompanyId);

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify(newCompany));
});

router.get('/company/read', function(req, res){
  var companyId = req.query.companyId || req.body.companyId;

  companyAPI.readCompany(companyId, function(err, company){
    res.json(company);
  });
});

router.put('/company/update', function(req, res){
  companyAPI.updateCompany(req.body.companyId, req.body.companyObj, {}, function(err, company){
    res.json(company);
  });
});

router.delete('/company/delete', function(req, res){
  console.log('Deleting Company');
  var isDeleted = companyAPI.deleteCompany(req.body.companyId);
  if(isDeleted){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'completed', isRemoved: true});
  }
});

router.get('/client/list', function(req, res){
  companyAPI.getCompanyClients(req.body.companyId, function(err, clients){
    if (err) throw err;

    res.json(clients);
  });
});

router.get('/client/search', function(req, res){
  companyAPI.searchClients(req.body.companyId, req.query.searchExp, function(err, clients){
    if(err) throw err;

    res.json(clients);
  });
});

router.put('/client/add', function(req, res){
  companyAPI.addClienToCompany(req.body.companyId, req.body.clientId);
});

module.exports = router;
