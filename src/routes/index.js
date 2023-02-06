const express = require('express');

const productMainRouter = require('./products-main');
const productDetailRouter = require('./products-detail');

const router = express.Router();

router.use('/', [productMainRouter,productDetailRouter]);
module.exports = router;
