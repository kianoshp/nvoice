'use strict';

var passport = require('passport');

/*
  Passport session setup.
  To support persistent login sessions, Passport needs to be able to
  serialize users into and deserialize users out of the session.  Typically,
  this will be as simple as storing the user ID when serializing, and finding
  the user by ID when deserializing.
*/
passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});
