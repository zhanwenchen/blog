// // Old authorization method using req['user']
// module.exports = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     next(new Error(401));
//   }
// };
const jwt = require('jsonwebtoken');

const config = require('../config');
const models = require('../models');

const User = models.User;

const return401 = res => res.status(401).end();

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from an authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (error, decoded) => {
    // the 401 code is for unauthorized status
    if (error) return return401(res);

    const userId = decoded.sub;

    // check if a user exists
    User.findById(userId)
      .then(possibleUser => (possibleUser ? next() : return401(res)))
      .catch(e => return401(res));
  });
};
