'use strict';

var Invoice = require('../models/invoice');

var invoiceAPI = {
  invoice: {},
  createInvoiceObj: function(req) {
    var invoiceObject = new Invoice({
      title: req.body.title,
      description: req.body.description,
      clientId: req.body.clientId,
      companyId: req.body.companyId,
      poNumber: req.body.poNumber,
      invoiceNumber: req.body.invoiceNumber,
      taxApplied: req.body.taxApplied,
      feeApplied: req.body.feeApplied,
      lastUpdated: req.body.lastUpdated,
      createdOn: Date.now(),
      status: req.body.status,
      invoiceItems: req.body.invoiceItems
    });

    return invoiceObject;
  },

  createInvoice: function(invoiceObj, cb) {
    invoiceObj.save(function(err, next) {

      cb(err, invoiceObj, next);
    });
  },

  readInvoice: function(invoiceId, cb) {
    Invoice.findById(invoiceId, function(err, doc, next) {

      cb(err, doc, next);
    });
  },

  upddateInvoice: function(invoiceId, invoiceObj, options, cb) {
    Invoice.findByIdAndUpdate(invoiceId, invoiceObj,
      options, function(err, doc, next) {

        cb(err, doc, next);
      });
  },

  deleteInvoice: function(invoiceId) {
    Invoice.remove({_id: invoiceId}, function(err) {
      if (err) {
        return false;
      }

      return true;
    });
  }
};

module.exports = invoiceAPI;
