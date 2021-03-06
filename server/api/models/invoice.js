var mongoose = require('mongoose');
var db = require('./db');
var InvoiceItemSchema = require('./invoice-item');

var InvoiceSchema = new db.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  clientId: db.Schema.ObjectId,
  companyId: db.Schema.ObjectId,
  poNumber: Number,
  invoiceNumber: {
    type: Number,
    default: 1000
  },
  taxApplied: {
    type: Boolean,
    default: false
  },
  feeApplied: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['presented', 'entered', 'hold', 'paid',
      'partially paid', 'reversed', 'void'],
    required: true
  },
  invoiceItems: [InvoiceItemSchema]
});

module.exports = mongoose.model('invoice', InvoiceSchema);
