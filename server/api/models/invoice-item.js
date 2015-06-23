'use strict';

var mongoose = require('mongoose');
var db = require('./db');
var Invoice = require('./invoice');

var InvoiceItemSchema = new db.Schema({
  invoiceId: {
    type: db.Schema.ObjectId,
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

module.exports = mongoose.model('invoiceItem', InvoiceItemSchema);
