// TODO: consider deprecating passport local signup strategy. What's the point?
const debug = require('debug')('blog');
const PassportLocalStrategy = require('passport-local').Strategy;
// const { UniqueConstraintError } = require('sequelize');

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
     * NOTE: The issue is the promise chain: once an error/rejection is caught, the chain continues
     * NOTE: make sure done is called once and only once.
     */
    User.findOne({ where: { username: email } })
      .then((existingUser) => {
        if (existingUser) {
          /**
           * You must throw an error to abort the promise chain. Otherwise
           * the rest will be executed regardless of returning "done()"
           */
          const duplicateUserError = new Error(`user with email ${email} already exists`);
          duplicateUserError.name = 'DuplicateUserError';
          throw duplicateUserError;
        }
      })
      // TODO: important promise lesson: then(() => Promise) instead of then(Promise)
      .then(() => User.create(userData))
      .then((newUser) => {
        if (newUser) { return done(null, newUser); }
        throw new Error('newUser was not created for some reason');
      })
      .catch(error => done(error, false, { message: 'unknown error in local-signup' }));
  },
);
