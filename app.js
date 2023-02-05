const express = require("express");
const path = require('path');
require('dotenv').config();

const router = require('./src/routes/index');
const pageRouter = require('./src/routes/page');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.use('/', pageRouter);
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});