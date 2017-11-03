const validateLoginForm = require('../utils/validateLoginForm');
/**
* Handle AJAX login calls by returning a JSON with status code
* most local-login logic in ~/configurePassport.js
*/

const passport = require('passport');

module.exports = (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json(validationResult);
  }
  // (err, user, info) => {} is a custom callback instead of
  // {  successRedirect: '/blah', failureRedirect: '/blahblahh' }
  return passport.authenticate('local-login', (err, token, info) => {
    if (err) return res.status(401).json({ message: 'error authenticating' });
    if (!token) return res.status(401).json(validationResult);

    return res.json(Object.assign(validationResult, { token }));

    // Manually establish the session...
    // req.logIn(user, (error) => {
    //   // console.log('In postLoginHandler. user is', user);
    //   if (error) return next(error);
    //   return res.status(200).json({
    //     username: user.username,
    //     message: 'user authenticated',
    //   });
    // });
  })(req, res, next);
};
