const router  = require('express').Router();
const User = require('../models/User');

router.get('/distribuidores', (req, res) => {
  User.find()
  .then(dist => res.json(dist))
  .catch(e => console.log(e))
});

router.post('/new-dist', (req, res, next) => {
  User.create(req.body)
  .then(dist => res.json(dist))
  .catch(e => next(e))
});



module.exports = router;