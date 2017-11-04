/**
* @file routes/signup.js
* route handler for signup logic
* if user doesn't exist, create it with data in req, and then go to login
*/

// TODO: Implement beforeCreate/beforeValidate computation hash/salt
// IDEA: if user already exists, flash 'username ... already exists' message. See https://stackoverflow.com/questions/19797918/send-error-message-on-redirect

const passport = require('passport');
const debug = require('debug')('blog');

const validateSignupForm = require('../utils/validateSignupForm');

/**
* @function
* @description route handler for POST '/users'
* most of logic inside ~/configurePassport.js:
* @todo return passport invocation?
* @param {Object} req
* @param {Object} res
* @param {Object} next
* @return {Object}
*/
module.exports = (req, res, next) => {
  debug(`postSignupHandler: req is`, req);
  const validationResult = validateSignupForm(req.body);
  debug(`postSignupHandler: validationResult is ${JSON.stringify(validationResult, null, 2)}`);
  if (!validationResult.success) {
    return res.status(400).json(validationResult);
  }

  debug('postSignupHandler is being required');
  // the params (err, user, info) are the parameters we provide to done in localSignupStrategy
  return passport.authenticate('local-signup', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }

    debug('In postSignupHandler. In passport.authenticate callback. User is', user);
    return res.status(200).json(user);
  })(req, res, next);
};
