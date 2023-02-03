const AdminsServices = require('../services/admins.services');

const checkErrorMessage = require('../utills/check-errorMessage');

class AdminsController {
  adminsServices = new AdminsServices();

  registerAdmin = async (req, res) => {
    const { inputAccount, inputPassword, inputName } = req.body;

    const returnValue = await this.adminsServices.registerAdmin(
      inputAccount,
      inputPassword,
      inputName
    );

    res.status(201).json({
      message: `${returnValue.dataValues.name}관리자가 생성되었습니다`,
    });
  };

  loginAdmin = async (req, res) => {
    const { inputAccount, inputPassword } = req.body;

    const returnValue = await this.adminsServices.loginAdmin(
      inputAccount,
      inputPassword
    );

    if (checkErrorMessage(returnValue)) {
      res
        .status(returnValue.code)
        .json({ errorMessage: returnValue.errorMessage });
    }

    res.cookie(returnValue.accessToken);
    res.cookie(returnValue.refreshToken);

    res.status(200).json({ message: '관리자가 로그인했습니다' });
  };
}

module.exports = AdminsController;
