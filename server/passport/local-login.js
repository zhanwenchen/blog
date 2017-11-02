const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const config = require('../config');

const models = require('../models');

const User = models.User;

const incorrectCredentialsError = new Error('Incorrect email or password');
incorrectCredentialsError.name = 'IncorrectCredentialsError';

/**
 * Return the Passport Local Strategy object.
 */
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
    };

    // find a user by email address
    User.findOne({ username: userData.email })
      .then((possibleUser) => {
        if (!possibleUser) {
          return done(incorrectCredentialsError);
        }
        return possibleUser;
      })
      .catch(error => done(error))
      .then((user) => {
        // check if a hashed user's password is equal to a value saved in the database
        user.isPasswordValid(userData.password)
          .then((isValid) => {
            if (!isValid) {
              return done(incorrectCredentialsError);
            }
            const payload = {
              sub: user.id,
            };

            // create a token string
            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
              name: user.name,
            };

            return done(null, token, data);
          })
          .catch(error => done(error));
      });
  },
);
