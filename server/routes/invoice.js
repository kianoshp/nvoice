'use strict';

var invoiceAPI = require('./../api/controllers/invoice');

var invoice = function(app) {

  app.post('/invoice/create', function(req, res) {
    var thisInvoice = invoiceAPI.createInvoiceObj(req);

    invoiceAPI.createInvoice(thisInvoice, function(err, invoiceObj) {
      if (err) {
        throw err;
      }

      res.json(invoiceObj);
    });
  });

  app.get('/invoice/read', function(req, res) {
    var invoiceId = req.query.invoiceId || req.body.invoiceId;

    invoiceAPI.readInvoice(invoiceId, function(err, invoice) {
      if (err) {
        throw err;
      }

      res.json(invoice);
    });
  });

  app.put('/invoice/update', function(req, res) {
    invoiceAPI.upddateInvoice(req.body.invoiceId, req.body.invoiceObj, {new: true}, function(err, invoice) {
      if (err) {
        throw err;
      }

      res.json(invoice);
    });
  });

  app.delete('/invoice/delete', function(req, res) {
    invoiceAPI.deleteInvoice(req.body.invoiceId);
    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'complete', isRemoved: true});
  });
};

module.exports = invoice;
