const express = require('express');

const router = express.Router();

router.get('/admin_register_page', (req, res) => {
  res.render('admin/admin-register');
});

router.get('/admin_login_page', (req, res) => {
  res.render('admin/admin-login');
});

router.get('/admin', (req, res) => {
  res.render('admin/index');
});

module.exports = router;
