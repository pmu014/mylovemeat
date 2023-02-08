const express = require('express');

const ProductsController = require('../controllers/products.controllers');

const router = express.Router();
const productsController = new ProductsController();
const userAuthToken = require('../middlewares/user-auth-middleware');

router.get('/:productId', productsController.getProduct);

router.get('/', productsController.getProducts);

module.exports = router;
