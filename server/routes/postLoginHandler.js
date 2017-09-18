/**
* Handle AJAX login calls by returning a JSON with status code
* most local-login logic in ~/configurePassport.js
*/

const passport = require('passport');

module.exports = (req, res, next) => {
  // (err, user, info) => {} is a custom callback instead of
  // {  successRedirect: '/blah', failureRedirect: '/blahblahh' }
  passport.authenticate('local-login', (err, user) => {
    if (err) return next(err);
    if (!user) return res.json(403, { message: 'no user found' });

    // Manually establish the session...
    req.logIn(user, (error) => {
      if (error) return next(error);
      return res.json({ message: 'user authenticated' });
    });

    return res.json(500, { message: 'postLoginHandler: something went wrong' });
  })(req, res, next);
};
