'use strict';

var InvoiceItem = require('../models/invoice-item');
var Invoice = require('../models/invoice');
var _ = require('lodash');
var R = require('ramda');

var invoiceItemAPI = {
  invoiceItem: {},

  createInvoiceItemObj: function(req) {
    var invoiceItemObject = new InvoiceItem({
      invoiceId: req.body.invoiceId,
      description: req.body.description,
      qty: req.body.qty,
      rate: req.body.rate,
      isFlatFee: req.body.isFlatFee
    });

    return invoiceItemObject;
  },

  createInvoiceItem: function(invoiceId, invoiceItemObj, options, cb) {
    Invoice.findByIdAndUpdate(invoiceId, invoiceItemObj, options, function(err, doc, next) {
      cb(err, doc, next);
    });
  },

  readInvoiceItem: function(invoiceId, invoiceItemId, cb) {
    Invoice.findById(
      invoiceId, function(err, doc, next) {
        var thisInvoiceItem = doc.invoiceItems.filter(function(invoiceItem) {
          return invoiceItem._id.toString() === invoiceItemId;
        }).pop();

        cb(err, thisInvoiceItem, next);
      }
    );
  },

  updateInvoiceItem: function(invoiceId, invoiceItemId, invoiceItemObj, cb) {

  },

  deleteInvoiceItem: function(invoiceId, invoiceItemId, cb) {
    console.log(invoiceItemId);
    Invoice.findByIdAndUpdate(invoiceId, invoiceItemId, function(err) {
      cb(err);
    });
  }
};

module.exports = invoiceItemAPI;
