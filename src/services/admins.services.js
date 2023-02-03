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
        adminId: returnValue.dataValues.id,
        accountId: returnValue.dataValues.account,
        rating: returnValue.dataValues.rating,
      },
      process.env.ACCESS_JWT_SECRET_KEY,
      {
        expiresIn: '5m',
      }
    );

    const refreshToken = jwt.sign(
      {
        type: 'JWT',
        adminId: returnValue.dataValues.id,
        accountId: returnValue.dataValues.account,
        rating: returnValue.dataValues.rating,
      },
      process.env.REFRESH_JWT_SECRET_KEY,
      {
        expiresIn: '5h',
      }
    );

    return { accessToken, refreshToken };
  };
}

module.exports = AdminsServices;
