const express = require('express');

const router = express.Router();

router.get('/user_signup', (req, res) => {
  res.render('user-signup');
});

router.get('/user_login', (req, res) => {
  res.render('user-login');
});

router.get('/cart_show', (req, res) => {
  res.render('cart-show');
});

router.get('/order_order', (req, res) => {
  res.render('order-order');
});


module.exports = router;
