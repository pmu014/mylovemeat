const express = require('express');

const AdminsController = require('../controllers/admins.controllers');

const router = express.Router();
const adminsController = new AdminsController();

router.post('/login', adminsController.loginAdmin);

router.post('/', adminsController.registerAdmin);

module.exports = router;
