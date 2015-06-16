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
};

module.exports = invoiceItem;
