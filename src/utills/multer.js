const path = require('path');

const multer = require('multer');
const dayjs = require('dayjs');

const imagePath = path.join(__dirname, '../', 'public', 'images');

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(1);
    cb(null, imagePath);
  },
  filename: (req, file, cb) => {
    console.log(2);
    req.body.inputImage =
      req.body.inputName.replace(/ /g, '-') +
      '-' +
      dayjs().format('YYYY-MM-DD-HH-mm-ss') +
      '-' +
      Buffer.from(file.originalname, 'latin1').toString('utf-8');
    cb(null, req.body.inputImage);
  },
});
const upload = multer({ storage: imageStorage });

module.exports = upload;
