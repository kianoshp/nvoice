'use strict';

var InvoiceItem = require('../models/invoice-item');
var Invoice = require('../models/invoice');
var mongoose = require('mongoose');

var invoiceItemAPI = {
  invoiceItem: {},

  createInvoiceItemObj: function(invoiceItem) {
    var invoiceItemObject = new InvoiceItem({
      description: invoiceItem.description,
      qty: invoiceItem.qty,
      rate: invoiceItem.rate,
      isFlatFee: invoiceItem.isFlatFee
    });

    return invoiceItemObject;
  },

  createInvoiceItem: function(invoiceId, invoiceItemObj, options, cb) {
    Invoice.findByIdAndUpdate(invoiceId, invoiceItemObj, options, function(err, doc, next) {
      cb(err, doc, next);
    });
  },

  readInvoiceItem: function(invoiceId, invoiceItemId, cb) {
    var thisInvoiceItemId = mongoose.Types.ObjectId(invoiceItemId);

    Invoice.findOne("_id", invoiceId)
      .select({ "invoiceItems": { "$elemMatch": { "_id" : thisInvoiceItemId } } })
      .exec(
        function(err, doc, next) {
          console.log(doc);

          cb(err, doc, next);
        }
      );
  },

  updateInvoiceItem: function(invoiceId, invoiceItemId, invoiceItemObj, cb) {
    var thisInvoiceItemId = mongoose.Types.ObjectId(invoiceItemId);

    var invoiceItemobject = this.createInvoiceItemObj(invoiceItemObj);

    Invoice.findOneAndUpdate({ $and: [ { "_id": invoiceId }, { "invoiceItems._id": thisInvoiceItemId } ] },
        { $set: { "invoiceItems.$": invoiceItemobject } },
        { upsert: true, new: true },
        function(err, doc, next) {
          console.log(doc);

          cb(err, doc, next);
        }
      );
  },

  deleteInvoiceItem: function(invoiceId, invoiceItemId, cb) {
    var thisInvoiceItemId = mongoose.Types.ObjectId(invoiceItemId);

    Invoice.findOneAndUpdate({ "_id": invoiceId },
        { $pull: { "invoiceItems": { _id: thisInvoiceItemId } } },
        { new: true },
        function(err, doc, next) {
          console.log(doc);

          cb(err, doc, next);
        }
      );
  }
};

module.exports = invoiceItemAPI;
