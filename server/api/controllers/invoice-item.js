'use strict';

var InvoiceItem = require('../models/invoice-item');

var invoiceItemAPI = {
  invoiceItem: {},

  createItemObj: function(req) {
    var itemObject = new InvoiceItem({
      invoiceId: req.body.invoiceId,
      description: req.body.description,
      qty: req.body.qty,
      rate: req.body.rate,
      isFlatFee: req.body.isFlatFee
    });

    return itemObject;
  },

  createItem: function(itemObj, cb) {
    itemObj.save(function(err) {

      cb(err, itemObj);
    });
  },

  readItem: function(itemId, cb) {
    InvoiceItem.findById(itemId, function(err, doc) {

      cb(err, doc);
    });
  },

  updateItem: function(itemId, itemObj, options, cb) {
    InvoiceItem.findByIdAndUpdate(itemId, itemObj,
      options, function(err, doc) {

        cb(err, doc);
      });
  },

  deleteItem: function(itemId) {
    InvoiceItem.remove({_id: itemId}, function(err) {
      if (err) {
        return false;
      }

      return true;
    });
  }
};

module.exports = invoiceItemAPI;
