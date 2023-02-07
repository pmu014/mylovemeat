const express = require('express');

const adminsRouter = require('../routes/admins.routers');
const productsRouter = require('../routes/products.routers');
const usersRouter = require('./users.route');
const cartsRouter = require('./carts.route');
const ordersRouter = require('./orders.route');

const router = express.Router();

router.use('/admins', adminsRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/carts', cartsRouter);
router.use('/orders', ordersRouter);

module.exports = router;
