/**
* Handle AJAX login calls by returning a JSON with status code
*/

const passport = require('passport');

module.exports = (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.json(403, {
        message: "no user found"
      });
    }

    // Manually establish the session...
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({
        message: 'user authenticated',
      });
    });

  })(req, res, next);
}
