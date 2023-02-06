const path = require('path');
const fs = require('fs');

require('dotenv').config();

const { Admin, Product } = require('../db/models/index');
const CreateToken = require('../utills/CreateToken');
const HashedPassword = require('../utills/HashedPassword');
const AdminRepositories = require('../repositories/admins.repositories');
const checkErrorMessage = require('../utills/check-errorMessage');

class AdminsServices {
  adminRepositories = new AdminRepositories(Admin, Product);
  hashedPassword = new HashedPassword();
  createToken = new CreateToken();

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

    if (!returnValue) {
      return { code: '400', message: '아이디 또는 비밀번호가 틀렸습니다.' };
    }

    if (checkErrorMessage(returnValue)) {
      return returnValue;
    }

    const checkPassword = await this.hashedPassword.verifyPassword(
      inputPassword,
      returnValue.password,
      returnValue.salt
    );

    if (!checkPassword) {
      return { code: '400', message: '아이디 또는 비밀번호가 틀렸습니다.' };
    }

    const accessTokenPayload = {
      type: 'JWT',
      adminId: returnValue.id,
      accountId: returnValue.account,
      rating: returnValue.rating,
    };

    const refreshTokenPayload = {
      type: 'JWT',
      adminId: returnValue.id,
      accountId: returnValue.account,
      rating: returnValue.rating,
    };

    const accessToken = this.createToken.createAccessToken(accessTokenPayload);
    const refreshToken =
      this.createToken.createRefreshToken(refreshTokenPayload);

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

    console.log(__dirname, returnValue.img);
    const imgPath = path.join(
      __dirname,
      '../',
      'public',
      'images',
      returnValue.img
    );

    if (!returnValue) {
      return { code: 404, message: '상품을 찾을 수 없습니다' };
    }

    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }

    return returnValue;
  };
}

module.exports = AdminsServices;
