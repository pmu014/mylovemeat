const express = require('express');

const productMainRouter = require('./products-main');
const productDetailRouter = require('./products-detail');

const router = express.Router();

const adminsRouter = require('../routes/admins.routers');
const productsRouter = require('../routes/products.routers');
const usersRouter = require('./users.route');
const cartsRouter = require('./carts.route');
const ordersRouter = require('./orders.route');

router.use('/admins', adminsRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/carts', cartsRouter);
router.use('/orders', ordersRouter);
router.use('/', [productMainRouter, productDetailRouter]);

module.exports = router;
