/**
* Route handler for router.get('')
*/

const models = require('../models');
const debug = require('debug')('blog');

module.exports = (req, res) => {
  // REVIEW: see if findOne is deprecated in favor of findAll()[0]
  debug('getOnePostHandler: req.params is', req.params)
  models.Post.findOne({ where: { string_id: req.params.string_id } })
    .then((possiblePost) => {
      debug('possiblePost is', possiblePost)
      if (possiblePost) return res.status(200).json({ post: possiblePost });
      return res.status(404).json(new Error('Post not found'));
    })
    .catch((err) => {
      res.json({ message: err });
    });
};
