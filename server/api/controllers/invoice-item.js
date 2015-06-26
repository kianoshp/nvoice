'use strict';

var InvoiceItem = require('../models/invoice-item');
var Invoice = require('../models/invoice');
var mongoose = require('mongoose');
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
    Invoice.findByIdAndUpdate(invoiceId, invoiceItemObj, options, function(err, doc) {
      cb(err, doc);
    });
  },

  readInvoiceItem: function(invoiceId, invoiceItemId, cb) {
    Invoice.findById(
      invoiceId, function(err,doc) {
        var thisInvoiceItem = doc.invoiceItems.filter(function(invoiceItem) {
          return invoiceItem._id.toString() === invoiceItemId;
        }).pop();

        cb(err, thisInvoiceItem);
      }
    );
  },

  updateInvoiceItem: function(invoiceId, invoiceItemId, invoiceItemObj, cb) {
    var thisInvoiceItemId = mongoose.Types.ObjectId(invoiceItemId);

    Invoice.findOne("_id", invoiceId)
      .select({ "invoiceItems": { "$elemMatch": { "_id" : thisInvoiceItemId } } })
      .exec(
        function(err, doc) {
          console.log(doc);

          cb(err, doc);
        }
      );
  },

  deleteInvoiceItem: function(invoiceId, invoiceItemId, cb) {
    Invoice.findById(invoiceId, function(err, doc) {
      for(var i = 0; i < doc.invoiceItems.length; i++) {
        if (doc.invoiceItems[i]._id === invoiceItemId) {
          doc.invoiceItems[i].remove();
          cb(err, doc);
        }
      }
    });
  }
};

module.exports = invoiceItemAPI;
