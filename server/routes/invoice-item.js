'use strict';

var invoiceItemAPI = require('./../api/controllers/invoice-item');

var invoiceItem = function(app) {
  app.post('/invoiceItem/create', function(req, res) {
    var thisItem = invoiceItemAPI.createItemObj(req);

    invoiceItemAPI.createItem(thisItem, function(err, itemObj) {
      if (err) {
        throw err;
      }

      res.json(itemObj);
    });
  });

  app.get('/invoiceItem/read', function(req, res) {
    var itemId = req.query.itemId || req.body.itemId;

    invoiceItemAPI.readItem(itemId, function(err, item) {
      if (err) {
        throw err;
      }

      res.json(item);
    });
  });

  app.put('/invoiceItem/update', function(req, res) {
    invoiceItemAPI.updateItem(req.body.itemId,
      req.body.itemObj, {new: true}, function(err, item) {
      if (err) {
        throw err;
      }

      res.json(item);
    });
  });

  app.delete('/invoiceItem/delete', function(req, res) {
    invoiceItemAPI.deleteItem(req.body.itemId);
    res.setHeader('Content-Type', 'application/json');
    res.send({status: 'complete', isRemoved: true});
  });
};

module.exports = invoiceItem;
