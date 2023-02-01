require('dotenv').config();
module.exports = {
  development: {
    username: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'mylovemeat',
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'mylovemeat_test_db',
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
