const express = require('express');

const authToken = require('../middlewares/auth-middleware');

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

router.get('/admin_add_product', authToken, (req, res) => {
  res.render('admins/admin-add-product');
});

router.get('/admin_edit_product', authToken, (req, res) => {
  const { productId } = req.query;
  console.log(productId);

  res.render('admins/admin-edit-product', { productId });
});

module.exports = router;
