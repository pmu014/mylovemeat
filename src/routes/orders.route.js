const express = require("express");
const router = express.Router();

const OrdersController = require('../controllers/orders.controller');
const ordersController = new OrdersController();
const userAuthToken = require('../middlewares/user-auth-middleware');

router.get('/', userAuthToken, ordersController.cartGet);
router.post('/', userAuthToken, ordersController.orderPost);
// router.post('/login', cartsController.loginUser);

module.exports = router;