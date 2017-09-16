const models  = require('../models');
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  models.User.findAll({
    include: [ models.Post ]
  }).then((users) => {
    res.json(users);
  });
});

module.exports = router;
