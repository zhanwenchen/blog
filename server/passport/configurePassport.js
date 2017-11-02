const passport = require('passport');
const debug = require('debug');

const models = require('../models');

const User = models.User;

const localSignupStrategy = require('./localSignupStrategy');
const localLoginStrategy = require('./localLoginStrategy');

module.exports = () => {
  passport.serializeUser((user, done) => {
    // FIXME: passport error: user cannot be serialized
    debug('in serializeUser');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        if (user) done(null, user.get()); else done(user.errors, null);
      })
      .catch((err) => { if (err) done(null, false); });
  });

  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login', localLoginStrategy);
};
