const express = require('express');

const adminAuthToken = require('../middlewares/admin-auth-middleware');
const AdminsController = require('../controllers/admins.controllers');
const upload = require('../utills/multer');

const router = express.Router();
const adminsController = new AdminsController();

router.post('/logout', adminsController.logoutAdmin);

router.delete(
  '/products/:productId',
  adminAuthToken,
  adminsController.delProduct
);

router.post(
  '/products',
  upload.single('inputImage'),
  adminAuthToken,
  adminsController.addProduct
);

router.put(
  '/products',
  upload.single('inputImage'),
  adminAuthToken,
  adminsController.editProduct
);

router.post('/login', adminsController.loginAdmin);

router.get('/orders', adminAuthToken, adminsController.getOrders);

router.put('/orders', adminAuthToken, adminsController.changeStatus);

router.post('/', adminAuthToken, adminsController.registerAdmin);

module.exports = router;
