/**
* routes/signup.js
* route handler for signup logic
* if user doesn't exist, create it with data in req, and then go to login
*/

// TODO: create logic fields imcomplete
// TODO: if user already exists, flash 'username ... already exists' message. See https://stackoverflow.com/questions/19797918/send-error-message-on-redirect
const models = require('../models');

module.exports = (req, res) => {
  models.User.find( { where: { username: req.username } } )
    .then((user) => {

      if (user) res.redirect('/signup');

  		models.User.create({username: req.body.username, password: req.body.password})
        .then()
        .catch(err => {
  				console.log(`signup.js: Error trying to create user with username=${req.username}`);
          throw err;
  			});
  	}
    .catch(err => {
      console.log(`signup.js: Error trying to find user with username=${req.username}`);
      throw err;
    }));
};
