/**
* Route handler for router.get('/users')
*/

const models = require('../models');


module.exports = (req, res) => {

  models.Post.findAll()
    .then(postsArray => {
      res.json({ postsArray });
    })
    .catch(err => {
      res.json({
        message: err
      })
    })
};
