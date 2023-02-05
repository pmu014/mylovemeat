const express = require('express');

const productRouter = require('./products-main');

const router = express.Router();

router.use('/', productRouter);
module.exports = router;
