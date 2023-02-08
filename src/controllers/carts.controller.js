const CartsService = require('../services/carts.service');
const checkErrorMessage = require('../utills/check-errorMessage');

class CartsController {
  cartsService = new CartsService();

  cartGet = async (req, res, next) => {
    try {
      const { userId } = req.tokenInfo;

      const returnValue = await this.cartsService.cartGet(userId);

      if (checkErrorMessage(returnValue)) {
        return res
          .status(returnValue.code)
          .json({ errorMessage: returnValue.message });
      }
      res.status(201).json({
        returnValue,
      });
    } catch (error) {
      console.log('cartGet error - controller', error);
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
    }
  };

  cartDelete = async (req, res) => {
    const { userId } = req.tokenInfo;
    const { productId } = req.params;

    const returnValue = await this.cartsService.cartDelete(userId, productId);

    if (checkErrorMessage(returnValue)) {
      return res
        .status(returnValue.code)
        .json({ errorMessage: returnValue.message });
    }

    res.status(204).end();
  };
  cartPut = async (req, res) => {
    const { userId } = req.tokenInfo;
    const { productId } = req.params;
    const { quantity } = req.body;

    const returnValue = await this.cartsService.cartPut(
      userId,
      productId,
      quantity
    );

    if (checkErrorMessage(returnValue)) {
      return res
        .status(returnValue.code)
        .json({ errorMessage: returnValue.message });
    }

    res.status(201).end();
  };
}
module.exports = CartsController;
