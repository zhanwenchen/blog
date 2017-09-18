/**
*
*/

const models = require('../models');


// IDEA, FIXME: validate string_id uniqueness in the method or in User.hooks?
module.exports = (req, res) => {
  // Option 1: implement validating string_id checking in route handler
  models.Post.findOne({ where: { string_id: req.param.title } })
    .then((possiblePost) => {
      // if that string_id is already taken, then alter it
      if (possiblePost) {
        throw Error(`Unique string_id validation has not been
            implemented in route handler`);
      }

      models.Post.create({
        title: req.param.title,
        body: req.param.body })
        .then((newPost) => { res.json(newPost); });
    });


  // Option 2: implement validating string_id checking in User.hooks.
  models.Post.create({
    title: req.param.title,
    body: req.param.body })
    .then((newPost) => { res.json(newPost); })
    .catch((err) => { throw err; });
};
