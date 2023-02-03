const express = require('express');

const adminRouter = require('../routes/admins.router');

const router = express.Router();

router.use('/admins', adminRouter);

module.exports = router;
