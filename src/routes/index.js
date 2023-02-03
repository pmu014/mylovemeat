const express = require('express');
const router = express.Router();

const usersRouter = require('./users.route');

router.use('/users', usersRouter);
// router.use('/signup', (req, res)=>  {
//     res.send("sdf")
// });

module.exports = router;
