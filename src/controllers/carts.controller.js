const CartsService = require('../services/carts.service');
const checkErrorMessage = require('../utills/check-errorMessage');

class CartsController {
    cartsService = new CartsService();

    cartGet = async (req, res, next) => {
      try {

      const { userId } =req.tokenInfo;

      
      const returnValue = await this.cartsService.cartGet(
        userId
      );
  
      if (checkErrorMessage(returnValue)) {
          return res
          .status(returnValue.code)
          .json({ errorMessage: returnValue.errorMessage });
          
      }
      res.status(201).json({
          returnValue
      });
      } catch (error) {
      console.log('Carts error - controller', error);
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      }    
  }
}
module.exports = CartsController;

