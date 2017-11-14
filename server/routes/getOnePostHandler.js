/**
* Route handler for router.get('')
*/

const { Post, User } = require('../models');

module.exports = (req, res) => {
  Post.findOne({
    where: { string_id: req.params.string_id },
    include: [User],
  })
    .then(possiblePost =>
      (
        possiblePost ?
          res.status(200).json({ errors: {}, post: possiblePost }) :
          res.status(404).json({ errors: 'post not found', post: null })
      ),
    )
    .catch(error => res.json({ errors: error }));
};
