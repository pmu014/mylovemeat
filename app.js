const path = require('path');

const express = require('express');
const cookie_parser = require('cookie-parser');

require('dotenv').config();

const router = require('./src/routes/index');
const models = require('./src/db/models/index');
const pageRouter = require('./src/routes/page');

const env = process.env;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());
// app.use('/api', router);
app.use('/', pageRouter);
app.use(express.static(path.join(__dirname, 'src', 'public')));

models.sequelize
  .sync()
  .then(() => {
    console.log('DB 연결 성공');
  })
  .catch((err) => {
    console.log('연결 실패: ', err);
  });

app.listen(env.PORT, () => {
  console.log(env.PORT, '번 포트로 준비되었습니다');
});
