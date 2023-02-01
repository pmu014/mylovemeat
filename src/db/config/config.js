require('dotenv').config({ path: '../../.env' });

const env = process.env;
console.log(env.MYSQL_DATABASE);
const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: 'mysql',
  port: env.MYSQL_PORT
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: 'mysql',
  //port: env.MYSQL_PORT
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_TEST_DATABASE,
  host: env.MYSQL_HOST,
  dialect: 'mysql',
  //port: env.MYSQL_PORT
};

module.exports = { development, production, test };
