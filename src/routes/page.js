const express = require('express');

const router = express.Router();

router.get('/products_main', (req, res) => {
  res.render('products/products-main');
});

router.get('/products_detail', (req, res) => {
  res.render('products/products-detail');
});

router.get('/', (req, res) => {
    res.render('products/index');
});

module.exports = router;
