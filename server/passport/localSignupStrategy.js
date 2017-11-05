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

    /**
     * NOTE: the problem might be that we are returning done twice, once
     * in then existingUser, another in User.create catch.
     * NOTE: correction: the above is wrong. You cannot call done(error)
     * because it crashes the app and there's no way to handle it in
     * the handler (which can only return next(error) or risk returning
     * multiple error responses with multiple status codes). Rather, use the
     * second param (whether a user exists)
     * as an error condition which the handler can then use to return
     * a status once
     */
    User.findOne({ where: { username: email } })
      .then((existingUser) => {
        if (existingUser) {
          return done(null, false, { message: `user with email ${email} already exists` });
        }
        return null;
      })
      // TODO: important promise lesson: then(() => Promise) instead of then(Promise)
      .then(() => User.create(userData))
      .catch(error =>
        done(null, false, { message: `error in local-signup: ${error}` }),
      )
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
