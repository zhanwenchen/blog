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
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) return res.status(400).json(validationResult);

  // the params (err, user, info) are the parameters we provide to done in localSignupStrategy
  return passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      /**
       * TODO: (blog) you must call next(err) and handle error in app.use(path, handler).
       * next(err) stops express from running everything else.
       * if you did use the commented out code below, setHeader will be called
       * multiple times, resulting in an obscure error.
       */
      if (err.name === 'DuplicateUserError' || err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.',
          },
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Check the form for errors.',
        errors: {
          email: 'This email is already taken.',
        },
      });
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Check the form for errors.',
        errors: {
          email: 'Error processing signup form.',
        },
      });
    }
    debug('In postSignupHandler. In passport.authenticate callback. User is', user);
    return res.status(200).json({
      success: true,
      message: '',
      errors: {},
    });
  })(req, res, next);
};
