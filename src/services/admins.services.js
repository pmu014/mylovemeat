const path = require('path');
const fs = require('fs');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const { Admin, Product } = require('../db/models/index');

const HashedPassword = require('../utills/hashed-password');
const AdminRepositories = require('../repositories/admins.repositories');

class AdminsServices {
  adminRepositories = new AdminRepositories(Admin, Product);
  hashedPassword = new HashedPassword();

  registerAdmin = async (inputAccount, inputPassword, inputName) => {
    const encyptionPassword = await this.hashedPassword.createHashedPassword(
      inputPassword
    );

    const returnValue = await this.adminRepositories.registerAdmin(
      inputAccount,
      encyptionPassword.password,
      inputName,
      encyptionPassword.salt
    );

    return returnValue;
  };

  loginAdmin = async (inputAccount, inputPassword) => {
    const returnValue = await this.adminRepositories.getAdmin(inputAccount);

    const checkPassword = await this.hashedPassword.verifyPassword(
      inputPassword,
      returnValue.dataValues.password,
      returnValue.dataValues.salt
    );

    if (!checkPassword) {
      return { code: '400', errorMessage: 'Login Fail' };
    }

    const accessToken = jwt.sign(
      {
        type: 'JWT',
        adminId: returnValue.id,
        accountId: returnValue.account,
        rating: returnValue.rating,
      },
      process.env.ACCESS_JWT_SECRET_KEY,
      {
        expiresIn: '5m',
      }
    );

    const refreshToken = jwt.sign(
      {
        type: 'JWT',
        adminId: returnValue.id,
        accountId: returnValue.account,
        rating: returnValue.rating,
      },
      process.env.REFRESH_JWT_SECRET_KEY,
      {
        expiresIn: '5h',
      }
    );

    return { accessToken, refreshToken };
  };

  addProduct = async (
    inputName,
    inputPrice,
    inputDesc,
    inputImage,
    inputQuantity,
    adminId
  ) => {
    const returnValue = await this.adminRepositories.addProduct(
      inputName,
      inputPrice,
      inputDesc,
      inputImage,
      inputQuantity,
      adminId
    );

    return returnValue;
  };

  editProduct = async (
    inputName,
    inputPrice,
    inputDesc,
    inputImage,
    inputQuantity,
    adminId,
    productId
  ) => {
    const returnValue = await this.adminRepositories.editProduct(
      inputName,
      inputPrice,
      inputDesc,
      inputImage,
      inputQuantity,
      adminId,
      productId
    );

    return returnValue;
  };

  delProduct = async (productId) => {
    const returnValue = await this.adminRepositories.delProduct(productId);

    const imgPath = path.join(
      __dirname,
      '../',
      'public',
      'images',
      returnValue.img
    );

    if (!returnValue.returnValue) {
      return { code: 404, errorMessage: '상품을 찾을 수 없습니다' };
    }

    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
    return returnValue;
  };
}

module.exports = AdminsServices;
