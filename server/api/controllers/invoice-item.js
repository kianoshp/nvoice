'use strict';

var InvoiceItem = require('../models/invoice-item');
var Invoice = require('../models/invoice');
var _ = require('lodash');
var R = require('ramda');

var invoiceItemAPI = {
  invoiceItem: {},

  createInvoiceItemObj: function(req) {
    var itemObject = new InvoiceItem({
      invoiceId: req.body.invoiceId,
      description: req.body.description,
      qty: req.body.qty,
      rate: req.body.rate,
      isFlatFee: req.body.isFlatFee
    });

    return itemObject;
  },

  createInvoiceItem: function(invoiceId, itemObj, options, cb) {
    Invoice.findByIdAndUpdate(invoiceId, itemObj, options, function(err, doc) {
      cb(err, doc);
    });
  },

  readInvoiceItem: function(invoiceId, itemId, cb) {
    Invoice.findById(
      invoiceId, function(err,doc) {
        var thisInvoiceItem = doc.invoiceItems.filter(function(invoiceItem) {
          return invoiceItem._id.toString() === itemId;
        }).pop();

        cb(err, thisInvoiceItem);
      }
    );
  },

  updateInvoiceItem: function(invoiceId, itemId, itemObj, cb) {

  },

  deleteInvoiceItem: function(invoiceId, itemId, cb) {
    console.log(itemId);
    Invoice.findByIdAndUpdate(invoiceId, itemId, function(err) {
      cb(err);
    });
  }
};

module.exports = invoiceItemAPI;
