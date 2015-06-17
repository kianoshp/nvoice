'use strict';

var mongoose = require('mongoose');
var db = require('./db');
var Invoice = require('./invoice');

var InvoiceItemSchema = new db.Schema({
  invoiceId: {
    type: db.Schema.ObjectId,
    ref: 'Invoice',
    required: true
  },
  description: String,
  qty: Number,
  rate: Number,
  isFlatFee: {
    type: Boolean,
    default: false
  }
});

InvoiceItemSchema.post('save', function() {
  var item = this;
  Invoice.findByIdAndUpdate(
    item.invoiceId,
    {$push: {'invoiceItems': [item]}},
    {safe: true, upsert: true, new: true},
    function(err) {
      if (err) {
        throw err;
      }
    });
});

module.exports = mongoose.model('invoiceItem', InvoiceItemSchema);
