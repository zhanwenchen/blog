/**
* @file Route handler for router.get('/users')
*/
const { Post, User } = require('../models');

module.exports = (req, res) => {
  Post.findAll({ include: [User] })
    .then(postsArray => res.status(200).send({ errors: {}, posts: postsArray }))
    .catch(error => res.json({ errors: error, posts: null }));
};
