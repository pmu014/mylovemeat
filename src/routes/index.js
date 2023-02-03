const express = require('express');

const adminsRouter = require('../routes/admins.routers');
const productsRouter = require('../routes/products.routers');

const router = express.Router();

router.use('/admins', adminsRouter);
router.use('/products', productsRouter);

module.exports = router;
