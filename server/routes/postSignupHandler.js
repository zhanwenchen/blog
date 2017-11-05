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
  debug(`postSignupHandler: req.body is`, req.body);
  const validationResult = validateSignupForm(req.body);
  debug(`postSignupHandler: validationResult is ${JSON.stringify(validationResult, null, 2)}`);
  if (!validationResult.success) {
    console.log('validation failed. Setting header to 400')
    return res.status(400).json(validationResult);
  }

  debug('postSignupHandler is being required');
  // the params (err, user, info) are the parameters we provide to done in localSignupStrategy
  return passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      /**
       * TODO: (blog) you must call next(err) and handle error in app.use.
       * next(err) stops express from running everything else.
       * if you did use the commented out code below, setHeader will be called
       * multiple times, resulting in an obscure error.
       */
      return next(err);
      // if (err instanceof UserExistsError || err.name === 'SequelizeUniqueConstraintError') {
      //   console.log('UserExistsError: seting header to 409')
      //   return res.status(409).json({
      //     success: false,
      //     message: 'Check the form for errors.',
      //     errors: {
      //       email: 'This email is already taken.',
      //     },
      //   });
      // }
      // console.log('other error: setting header to 409')
      // return res.status(409).json({
      //   success: false,
      //   message: 'Check the form for errors.',
      //   errors: {
      //     email: 'This email is already taken.',
      //   },
      // });
    }
    if (!user) {
      return res.status(409).json({
        success: false,
        message: 'Check the form for errors.',
        errors: {
          email: 'This email is already taken.',
        },
      });
    }

    debug('In postSignupHandler. In passport.authenticate callback. User is', user);
    return res.status(200).json(user);
  })(req, res, next);
};
