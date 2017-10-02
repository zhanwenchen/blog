/**
* routes/signup.js
* route handler for signup logic
* if user doesn't exist, create it with data in req, and then go to login
*/

// TODO: Implement beforeCreate/beforeValidate computation hash/salt
// IDEA: if user already exists, flash 'username ... already exists' message. See https://stackoverflow.com/questions/19797918/send-error-message-on-redirect

const passport = require('passport');
const debug = require('debug');
/**
* route handler for POST '/users'
* most of logic inside ~/configurePassport.js:
*/

module.exports = (req, res, next) => {
  debug('postSignupHandler is being required');
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }

    debug('In postSignupHandler. In passport.authenticate callback. User is', user);
    return res.status(200).json(user);
  })(req, res, next);
};
