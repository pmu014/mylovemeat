const AdminsServices = require('../services/admins.services');

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

    res.status(200).json({ message: '관리자가 로그인했습니다' });
  };
}

module.exports = AdminsController;
