/**
* Route handler for router.get('')
*/

const models = require('../models');


module.exports = (req, res) => {
  // REVIEW: see if findOne is deprecated in favor of findAll()[0]
  models.Post.findOne({ where: { string_id: req.param.string_id } })
    .then((possiblePost) => {
      if (possiblePost) res.json({ possiblePost });
      else res.json(new Error('Post not found'));
    })
    .catch((err) => {
      res.json({ message: err });
    });
};
