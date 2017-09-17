/**
* Route handler for router.get('')
*/

const models = require('../models');


module.exports = (req, res) => {
  // TODO: see if findOne is deprecated in favor of findAll()[0]
  models.Post.findOne({ where: { username: req.param.string_id }})
    .then(post => {
      res.json({ post });
    })
    .catch(err => {
      res.json({
        message: err
      })
    })
};
