const mysql = require('mysql2');
const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();
const userAuthToken = require('../middlewares/user-auth-middleware');

router.post('/logout', usersController.logoutUser);
router.post('/login', usersController.loginUser);
router.post('/', usersController.createUser);

router.get('/', userAuthToken, (req, res) => {
  const conn = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '0000',
    database: 'mylovemeat',
  };

  const { userId } = req.tokenInfo;

  let connection = mysql.createConnection(conn);
  connection.connect();

  let testQuery = `SELECT * FROM users where id = ${userId}`;

  connection.query(testQuery, function (err, results, fields) {
    console.log('results,', results);
    res.json({ user: results[0] });
  });
});

module.exports = router;
