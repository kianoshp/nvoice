'use strict';

var invoiceItemAPI = require('./../api/controllers/invoice-item');

var invoiceItem = function(app) {
  app.post('/invoiceItem/create', function(req, res) {
    var thisItem = invoiceItemAPI.createInvoiceItemObj(req);
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
    var updatedItem = req.query.itemObj || req.body.itemObj;

    invoiceItemAPI.updateInvoiceItem(invoiceId,
      invoiceItemId, updatedItem, function(err, invoiceItem) {
      if (err) {
        throw err;
      }

      res.json(invoiceItem);
    });
  });

  app.delete('/invoiceItem/delete', function(req, res) {
    invoiceItemAPI.deleteInvoiceItem(req.body.invoiceId,
     {$pull: {'invoiceItems': {_id: req.body.invoiceItemId}}},
      function(err) {
      if (err) {
        throw err;
      }

    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'complete', isRemoved: true});
    });
  });
};

module.exports = invoiceItem;
