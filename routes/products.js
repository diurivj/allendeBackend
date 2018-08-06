const router  = require('express').Router();
const Product = require('../models/Product');

router.post('/new-product', (req, res, next) => {
  Product.create(req.body)
  .then(product => res.json(product))
  .catch(e => next(e))
});

router.get('/products', (req, res) => {
  Product.find()
  .then(products => res.json(products))
  .catch(e => console.log(e))
});

module.exports = router;