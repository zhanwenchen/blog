/**
* Route handler for router.get('/users')
*/

const models = require('../models');


module.exports = (req, res) => {
  models.User.findAll()
    .then((usersArray) => {
      res.json({ usersArray });
    })
    .catch((err) => {
      res.json({ message: err });
    });
};
