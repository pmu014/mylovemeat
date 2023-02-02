const express = require('express');

const adminRouter = require('../routes/admins/admins');

const router = express.Router();

router.use('/admins', adminRouter);

module.exports = router;
