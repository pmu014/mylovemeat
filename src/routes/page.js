const express = require('express');

const router = express.Router();

router.get('/user_signup', (req, res) => {
  res.render('user-signup');
});

router.get('/user_login', (req, res) => {
  res.render('user-login');
});


module.exports = router;
