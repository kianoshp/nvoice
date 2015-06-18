'use strict';

var invoiceItemAPI = require('./../api/controllers/invoice-item');

var invoiceItem = function(app) {
  app.post('/invoiceItem/create', function(req, res) {
    var thisItem = invoiceItemAPI.createInvoiceItemObj(req);
    var thisInvoiceId = req.body.invoiceId;

    invoiceItemAPI.createInvoiceItem(
      thisInvoiceId,
      {$push: {'invoiceItems': [thisItem]}},
      {safe: true, upsert: true, new: true},
      function(err, invoiceItem) {
        if (err) {
          throw err;
        }

        res.json(invoiceItem);
      });
  });

  app.get('/invoiceItem/read', function(req, res) {
    var itemId = req.query.itemId || req.body.itemId;

    invoiceItemAPI.readInvoiceItem(itemId, function(err, item) {
      if (err) {
        throw err;
      }

      res.json(item);
    });
  });

  app.put('/invoiceItem/update', function(req, res) {
    invoiceItemAPI.updateInvoiceItem(req.body.itemId,
      req.body.itemObj, {new: true}, function(err, item) {
      if (err) {
        throw err;
      }

      res.json(item);
    });
  });

  app.delete('/invoiceItem/delete', function(req, res) {
    invoiceItemAPI.deleteInvoiceItem(req.body.itemId);
    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'complete', isRemoved: true});
  });
};

module.exports = invoiceItem;
