const debug = require('debug');
const PassportLocalStrategy = require('passport-local').Strategy;

const models = require('../models');

const User = models.User;

module.exports = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim(),
      name: req.body.name.trim(),
    };

    return User.create(userData)
      .then((newUser) => {
        if (newUser) {
          debug('In configurePassport.createUser. newUser was created. newUser is ', newUser);
          return done(null, newUser);
        }
        debug('In configurePassport.createUser. newUser was NOT created.');
        return done(null, false);
      })
      .catch(error => done(error, false, { message: 'error in local-signup' }));
  },
);
