const express = require('express');

const adminAuthToken = require('../middlewares/admin-auth-middleware');
const userAuthToken = require('../middlewares/user-auth-middleware');

const router = express.Router();

router.get('/products', (req, res) => {
  res.render('products/products-main');
});

router.get('/products/products-detail', (req, res) => {
  res.render('products/products-detail');
});

router.get('/', (req, res) => {
  res.render('products/index');
});

router.get('/user_signup', (req, res) => {
  res.render('users/user-signup');
});

router.get('/user_login', (req, res) => {
  res.render('users/user-login');
});

router.get('/cart_show', userAuthToken, (req, res) => {
  res.render('carts/cart-show');
});

router.get('/order_order', userAuthToken, (req, res) => {
  res.render('orders/order-order');
});

router.get('/admin_register', adminAuthToken, (req, res) => {
  const { rating } = req.tokenInfo;

  if (rating !== 'super') {
    return res
      .status(403)
      .send(
        "<script>alert('권한이 부족합니다.');location.href='/admin_index';</script>"
      );
  }

  res.render('admins/admin-register');
});

router.get('/admin_login', (req, res) => {
  res.render('admins/admin-login');
});

router.get('/admin_index', adminAuthToken, (req, res) => {
  res.render('admins/admin-index');
});

router.get('/admin_add_product', adminAuthToken, (req, res) => {
  res.render('admins/admin-add-product');
});

router.get('/admin_edit_product', adminAuthToken, (req, res) => {
  const { productId } = req.query;

  res.render('admins/admin-edit-product', { productId });
});

router.get('/admin_order', adminAuthToken, (req, res) => {
  res.render('admins/admin-order');
});

router.get('/mypage', (req, res) => {
  res.render('mypage');
});

module.exports = router;
