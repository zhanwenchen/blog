/**
* routes/signup.js
* route handler for signup logic
* if user doesn't exist, create it with data in req, and then go to login
*/

// TODO: Implement beforeCreate/beforeValidate computation hash/salt
// IDEA: if user already exists, flash 'username ... already exists' message. See https://stackoverflow.com/questions/19797918/send-error-message-on-redirect

const passport = require('passport');
/**
* route handler for POST '/users'
* most of logic inside ~/configurePassport.js:
*/

module.exports = (req, res, next) => {
  passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
  })(req, res, next);
};
