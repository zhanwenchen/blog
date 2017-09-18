/**
* Route handler for router.get('')
*/

const models = require('../models');


module.exports = (req, res) => {
  // REVIEW: see if findOne is deprecated in favor of findAll()[0]
  models.User.findOne({ where: { username: req.param.username } })
    .then((possibleUser) => {
      if (possibleUser) res.json({ possibleUser });
      else res.json(new Error('User not found'));
    })
    .catch((err) => {
      res.json({ message: err });
    });
};
