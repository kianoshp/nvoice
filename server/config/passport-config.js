var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var url = require('url');
var request = require('superagent');
var R = require('ramda');

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

passport.use(new LocalStrategy(
  function(username, password, done) {
    return validateUser(username, password, done);
  }
));

var visa = function(passport) {
  var users = [
    {username: 'kianosh.pourian@perkinelmer.com', password: 'password'},
    {username: 'muslim.baig@perkinelmer.com', password: 'password'},
    {username: 'richard.oleary@perkinelmer.com', password: 'password'},
  ]

  validateUser = function(username, password, done) {

    var validUser = function(user) {
      return user.username === username && user.password === password;
    };

    var user = R.filter(validUser, users);

    if (user) {
      return done(null, user);
    } else {
      return done(true, null);
    }
    // var options = {};
    // var reqURL;
    // var requestOptions = {};
    // var checkForPassword = true;
      
    // options = {
    //   protocol: 'http',
    //   host: '?',
    //   pathname: '?'
    // };
    
    // reqURL = url.format(options);
    // requestOptions = {
    //   headers: {
    //     'Content-type': 'application/json; charset=utf-8'
    //   },
    //   body: JSON.stringify({
    //     loginName: username,
    //     password: password,
    //     checkPassword: checkForPassword
    //   }),
    //   method: 'POST'
    //   };

    // request
    //   .post(reqURL)
    //   .set( {'Content-type': 'application/json; charset=utf-8'})
    //   .send(JSON.stringify({
    //     loginName: username,
    //     password: password})
    //   )
    //   .end(function(err, res) {
    //     if (err) {
    //       return done(null, err);
    //     }

    //     return done(null, res);
    //   });
  };
};

module.exports = visa;
