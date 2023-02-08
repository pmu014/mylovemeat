const express = require("express");
const router = express.Router();

const CartsController = require('../controllers/carts.controller');
const cartsController = new CartsController();
const ProductsController = require('../controllers/products.controllers');
const productsController = new ProductsController();
const userAuthToken = require('../middlewares/user-auth-middleware');

router.get('/', userAuthToken, cartsController.cartGet);
router.delete('/:productId', userAuthToken, cartsController.cartDelete);
router.put('/:productId', userAuthToken, cartsController.cartPut);
router.post('/',userAuthToken,productsController.cartProduct);

// router.post('/login', cartsController.loginUser);

module.exports = router;