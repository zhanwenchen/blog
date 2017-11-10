/**
* Route handler for router.get('')
*/

const debug = require('debug')('blog');
const { Post, User } = require('../models');

module.exports = (req, res) => {
  // REVIEW: see if findOne is deprecated in favor of findAll()[0]
  // debug('getOnePostHandler: req.params is', req.params);
  Post.findOne({
    where: { string_id: req.params.string_id },
    include: [User],
  })
    .then((possiblePost) => {
      debug('possiblePost is', possiblePost);
      if (possiblePost) {
        const { title, body, createdAt, updatedAt, User: user } = possiblePost;
        return res.status(200).json({
          post: {
            title,
            body,
            createdAt,
            updatedAt,
            author: `${user.firstName} ${user.lastName}`,
          },
        });
      }
      return res.status(404).json(new Error('Post not found'));
    })
    .catch((err) => {
      res.json({ message: err });
    });
};
