/**
* Route handler for router.get('/users')
*/

const models = require('../models');


module.exports = (req, res) => {

  models.Post.findAll()
    .then(postsArray => {
      res.status(200).send(postsArray);
    })
    .catch(err => {
      res.json({
        message: err
      })
    })
};
