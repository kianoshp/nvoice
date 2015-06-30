'use strict';

var invoiceItemAPI = require('./../api/controllers/invoice-item');

var invoiceItem = function(app) {
  app.post('/invoiceItem/create', function(req, res) {
    var thisItem = invoiceItemAPI.createInvoiceItemObj(req.body);
    var thisInvoiceId = req.body.invoiceId;

    invoiceItemAPI.createInvoiceItem(
      thisInvoiceId,
      {$push: {'invoiceItems': thisItem}},
      {safe: true, upsert: true, new: true},
      function(err, invoiceItem, next) {
        if (err) {
          next(err);
        }

        res.json(invoiceItem);
      });
  });

  app.get('/invoiceItem/read', function(req, res) {
    var invoiceId = req.query.invoiceId || req.body.invoiceId;
    var invoiceItemId = req.query.invoiceItemId || req.body.invoiceItemId;

    invoiceItemAPI.readInvoiceItem(invoiceId, invoiceItemId, function(err, invoiceItem, next) {
      if (err) {
        next(err);
      }

      res.json(invoiceItem);

    });
  });

  app.put('/invoiceItem/update', function(req, res) {
    var invoiceId = req.query.invoiceId || req.body.invoiceId;
    var invoiceItemId = req.query.invoiceItemId || req.body.invoiceItemId;
    var updatedInvoiceItem = req.query.invoiceItemObj || req.body.invoiceItemObj;

    invoiceItemAPI.updateInvoiceItem(invoiceId,
      invoiceItemId, updatedInvoiceItem, function(err, invoiceItem) {
      if (err) {
        throw err;
      }

      res.json(invoiceItem);
    });
  });

  app.delete('/invoiceItem/delete', function(req, res) {
    console.log(req.body);
    invoiceItemAPI.deleteInvoiceItem(req.body.invoiceId, req.body.invoiceItemId, function(err, invoice) {
      if (err) {
        throw err;
      }

      res.json({status: 'complete', isRemoved: true, invoice: invoice});
    });
  });
};

module.exports = invoiceItem;
