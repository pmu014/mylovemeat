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
      message: `${returnValue.name}관리자가 생성되었습니다`,
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
      return;
    }

    res.cookie('accessToken', returnValue.accessToken);
    res.cookie('refreshToken', returnValue.refreshToken);

    res.status(200).json({ message: '관리자가 로그인했습니다' });
  };

  addProduct = async (req, res) => {
    const { inputName, inputPrice, inputDesc, inputImage, inputQuantity } =
      req.body;
    const { adminId } = req.adminInfo;

    const returnValue = await this.adminsServices.addProduct(
      inputName,
      inputPrice,
      inputDesc,
      inputImage,
      inputQuantity,
      adminId
    );

    if (checkErrorMessage(returnValue)) {
      res
        .status(returnValue.code)
        .json({ errorMessage: returnValue.errorMessage });
    }

    res.status(201).json({ message: '상품이 추가되었습니다' });
  };

  editProduct = async (req, res) => {
    const {
      inputName,
      inputPrice,
      inputDesc,
      inputImage,
      inputQuantity,
      productId,
    } = req.body;

    const { adminId } = { adminId: 1 };

    const returnValue = await this.adminsServices.editProduct(
      inputName,
      inputPrice,
      inputDesc,
      inputImage,
      inputQuantity,
      adminId,
      productId
    );

    if (checkErrorMessage(returnValue)) {
      res
        .status(returnValue.code)
        .json({ errorMessage: returnValue.errorMessage });
    }

    res.status(201).json({ message: '상품이 수정 되었습니다.' });
  };
}

module.exports = AdminsController;
