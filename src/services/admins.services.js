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

    console.log('비밀번호 체크', checkPassword);
    return returnValue;
  };
}

module.exports = AdminsServices;
