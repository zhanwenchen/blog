const validateLoginForm = require('../utils/validateLoginForm');
const debug = require('debug')('blog');
/**
* Handle AJAX login calls by returning a JSON with status code
* most local-login logic in ~/configurePassport.js
*/

const passport = require('passport');

module.exports = (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) return res.status(400).json(validationResult);
  return passport.authenticate('local-login', (err, token, info) => {
    if (err) return res.status(401).json({ message: 'error authenticating' });
    if (!token) return res.status(401).json(validationResult);

    return res.status(200).json(Object.assign(validationResult, { token }));
  })(req, res, next);
};
