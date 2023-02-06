const express = require('express');

const authToken = require('../middlewares/auth-middleware');
const AdminsController = require('../controllers/admins.controllers');
const upload = require('../utills/multer');

const router = express.Router();
const adminsController = new AdminsController();

router.post('/logout', adminsController.logoutAdmin);

router.delete('/products/:productId', authToken, adminsController.delProduct);

router.post(
  '/products',
  upload.single('inputImage'),
  authToken,
  adminsController.addProduct
);

router.put(
  '/products',
  upload.single('inputImage'),
  authToken,
  adminsController.editProduct
);

router.post('/login', adminsController.loginAdmin);

router.post('/', authToken, adminsController.registerAdmin);

module.exports = router;
