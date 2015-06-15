'use strict';

var mongoose = require('mongoose');
var db = require('./db');
var bcrypt = require('bcrypt');

var UserSchema = new db.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  company: {
    type: db.Schema.ObjectId,
    ref: 'Company'
  },
  role: {
    type: String,
    enum: ['admin', 'client', 'invoiceCreator']
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();

  var salt = bcrypt.genSaltSync(10, 20);

  user.password = bcrypt.hashSync(user.password, salt);

  next();

  UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
  };
});

module.exports = mongoose.model('user', UserSchema);
