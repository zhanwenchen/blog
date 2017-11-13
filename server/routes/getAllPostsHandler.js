/**
* @file Route handler for router.get('/users')
*/
const { Post } = require('../models');

module.exports = (req, res) => {
  Post.findAll()
    .then(postsArray => res.status(200).send({ posts: postsArray }))
    .catch(err => res.json({ message: err }));
};
