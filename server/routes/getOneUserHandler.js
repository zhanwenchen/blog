/**
* Route handler for router.get('')
*/

const models = require('../models');


module.exports = (req, res) => {
  // TODO: see if findOne is deprecated in favor of findAll()[0]
  models.User.findOne({ where: { username: req.param.username }})
    .then(user => {
      res.json({ user });
    })
    .catch(err => {
      res.json({
        message: err
      })
    })
};
