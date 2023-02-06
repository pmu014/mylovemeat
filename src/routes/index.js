const express = require('express');
const router = express.Router();
// const authMiddleware = require('../middlewares/auth-middleware');
const usersRouter = require('./users.route');
const cartsRouter = require('./carts.route');
const ordersRouter = require('./orders.route');

router.use('/users', usersRouter);
router.use('/carts', cartsRouter);
router.use('/orders', ordersRouter);
// router.use('/signup', (req, res)=>  {
//     res.send("sdf")
// });

module.exports = router;
