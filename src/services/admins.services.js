const path = require('path');
const fs = require('fs');

require('dotenv').config();

const { Admin, Product, Order } = require('../db/models/index');
const CreateToken = require('../utills/CreateToken');
const HashedPassword = require('../utills/HashedPassword');
const AdminRepositories = require('../repositories/admins.repositories');
const checkErrorMessage = require('../utills/check-errorMessage');

class AdminsServices {
  adminRepositories = new AdminRepositories(Admin, Product, Order);
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

    if (!returnValue) {
      return { code: 404, message: '상품을 찾을 수 없습니다' };
    }

    return returnValue;
  };

  getOrders = async () => {
    const returnValue = await this.adminRepositories.getOrders();

    return returnValue;
  };

  changeStatus = async (orderId, status) => {
    if (status === '배송완료')
      return { code: 400, message: '요청이 잘못되었습니다' };

    let changeStatus = status;
    switch (changeStatus) {
      case '발송준비':
        changeStatus = '배송시작';
        break;
      case '배송시작':
        changeStatus = '배송중';
        break;
      case '배송중':
        changeStatus = '배송완료';
        break;
    }

    const returnValue = await this.adminRepositories.changeStatus(
      orderId,
      changeStatus
    );

    return returnValue;
  };
}

module.exports = AdminsServices;
