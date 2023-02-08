const AdminsServices = require('../services/admins.services');

const checkErrorMessage = require('../utills/check-errorMessage');

class AdminsController {
  adminsServices = new AdminsServices();

  registerAdmin = async (req, res) => {
    const { inputAccount, inputPassword, inputName } = req.body;

    if (!inputAccount || !inputPassword || !inputName) {
      return res.status(400).json({ errorMessage: '요청이 잘못되었습니다' });
    }

    const returnValue = await this.adminsServices.registerAdmin(
      inputAccount,
      inputPassword,
      inputName
    );

    if (checkErrorMessage(returnValue)) {
      return res
        .status(returnValue.code)
        .json({ errorMessage: returnValue.message });
    }

    res.status(201).json({
      message: `${returnValue.name} 관리자가 생성되었습니다`,
    });
  };

  loginAdmin = async (req, res) => {
    const { inputAccount, inputPassword } = req.body;

    if (!inputAccount || !inputPassword) {
      return res.status(400).json({ errorMessage: '요청이 잘못되었습니다' });
    }

    const returnValue = await this.adminsServices.loginAdmin(
      inputAccount,
      inputPassword
    );

    if (checkErrorMessage(returnValue)) {
      res.status(returnValue.code).json({ errorMessage: returnValue.message });
      return;
    }

    res.cookie('accessToken', returnValue.accessToken);
    res.cookie('refreshToken', returnValue.refreshToken);

    res.status(200).json({ message: '관리자가 로그인했습니다' });
  };

  addProduct = async (req, res) => {
    const { inputName, inputPrice, inputDesc, inputImage, inputQuantity } =
      req.body;
    const { adminId } = req.tokenInfo;

    if (
      !inputName ||
      !inputPrice ||
      !inputDesc ||
      !inputImage ||
      !inputQuantity
    ) {
      return res.status(400).json({ errorMessage: '요청이 잘못되었습니다.' });
    }

    const returnValue = await this.adminsServices.addProduct(
      inputName,
      inputPrice,
      inputDesc,
      inputImage,
      inputQuantity,
      adminId
    );

    if (checkErrorMessage(returnValue)) {
      return res
        .status(returnValue.code)
        .json({ errorMessage: returnValue.message });
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

    const { adminId } = req.tokenInfo;

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
      return res
        .status(returnValue.code)
        .json({ errorMessage: returnValue.message });
    }

    res.status(201).json({ message: '상품이 수정 되었습니다' });
  };

  delProduct = async (req, res) => {
    const { productId } = req.params;

    const returnValue = await this.adminsServices.delProduct(productId);

    if (checkErrorMessage(returnValue)) {
      return res
        .status(returnValue.code)
        .json({ errorMessage: returnValue.message });
    }

    res.status(204).end();
  };

  logoutAdmin = async (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(204).end();
  };

  getOrders = async (req, res) => {
    const returnValue = await this.adminsServices.getOrders();

    res.status(200).json({ returnValue });
  };

  changeStatus = async (req, res) => {
    const { status, orderId } = req.body;

    if (!status || !orderId) {
      return res.status(400).json({ message: '요청이 잘못되었습니다' });
    }

    const returnValue = await this.adminsServices.changeStatus(orderId, status);

    if (checkErrorMessage(returnValue)) {
      return res
        .status(returnValue.code)
        .json({ errorMessage: returnValue.message });
    }
    res.status(201).json({ message: '주문 상태가 변경되었습니다.' });
  };
}

module.exports = AdminsController;
