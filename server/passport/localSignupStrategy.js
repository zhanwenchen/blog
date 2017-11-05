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
      username: email.trim(),
      password: password.trim(),
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
    };

    User.findOne({ where: { username: email } })
      .then((existingUser) => {
        if (existingUser) {
          return done(null, false, { message: `user with email ${email} already exists` });
        }
        return existingUser;
      })
      // TODO: important promise lesson: then(() => Promise) instead of then(Promise)
      .then(() => User.create(userData))
      .catch(error => done(error, false, { message: 'error in local-signup' }))
      .then((newUser) => {
        if (newUser) {
          debug('In configurePassport.createUser. newUser was created. newUser is ', newUser);
          return done(null, newUser);
        }
        debug('In configurePassport.createUser. newUser was NOT created.');
        return done(null, false);
      })
      .catch(error => done(error, false, { message: 'unknown error in local-signup' }));
  },
);
