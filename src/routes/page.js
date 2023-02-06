const express = require('express');

const adminAuthToken = require('../middlewares/admin-auth-middleware');

const router = express.Router();

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

router.get('/admin_index', (req, res) => {
  res.render('admins/admin-index');
});

router.get('/admin_add_product', authToken, (req, res) => {
  res.render('admins/admin-add-product');
});

router.get('/admin_edit_product', authToken, (req, res) => {
  const { productId } = req.query;

  res.render('admins/admin-edit-product', { productId });
});

module.exports = router;
