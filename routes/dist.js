const router  = require('express').Router();
const User = require('../models/User');

router.get('/distribuidores', (req, res) => {
  console.log("perro");
  User.find()
  .then(dist => res.json(dist))
  .catch(e => console.log(e))
});




module.exports = router;