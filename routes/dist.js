const router  = require('express').Router();
const User = require('../models/User');


router.get('/distribuidores', (req, res) => {
  User.find()
  .then(products => res.json(products))
  .catch(e => console.log(e))
});

module.exports = router;