const express = require('express');

const AdminsController = require('../controllers/admins.controllers');
const upload = require('../utills/multer');

const router = express.Router();
const adminsController = new AdminsController();

router.post('logout', adminsController.logoutAdmin);

router.delete('/products/:productId', adminsController.delProduct);

router.post(
  '/products',
  upload.single('inputImage'),
  adminsController.addProduct
);

router.put(
  '/products',
  upload.single('inputImage'),
  adminsController.editProduct
);

router.post('/login', adminsController.loginAdmin);

router.post('/', adminsController.registerAdmin);

module.exports = router;
