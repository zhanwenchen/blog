const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

const models = require('../models');

const User = models.User;

const incorrectEmailError = new Error('Incorrect email');
incorrectEmailError.name = 'incorrectEmailError';
const incorrectPasswordError = new Error('Incorrect password');
incorrectPasswordError.name = 'incorrectPasswordError';

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
    User.findOne({ where: { username: userData.email } })
      .then((possibleUser) => {
        if (!possibleUser) { throw incorrectEmailError; }
        possibleUser.isPasswordValid(userData.password)
          .then((isValid) => {
            if (!isValid) { throw incorrectPasswordError; }
            const user = possibleUser;
            const payload = { sub: user.id };

            // create a token string
            const token = jwt.sign(payload, config.jwtSecret);
            const data = { name: user.name };

            return done(null, token, data);
          });
      })
      .catch(error => done(error));
  },
);
