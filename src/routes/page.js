const express = require('express');

const router = express.Router();

router.get('/admin_register', (req, res) => {
  res.render('admins/admin-register');
});

router.get('/admin_login', (req, res) => {
  res.render('admins/admin-login');
});

router.get('/admin_index', (req, res) => {
  res.render('admins/admin-index');
});

router.get('/admin_add_product', (req, res) => {
  res.render('admins/admin-add-product');
});

router.get('/admin_edit_product/:productId', (req, res) => {
  const { productId } = req.params;
  res.render('admins/admin-add-product', { productId });
});

module.exports = router;
