const OrdersService = require('../services/orders.service');
const checkErrorMessage = require('../utills/check-errorMessage');

class OrdersController {
    ordersService = new OrdersService();

    cartGet = async (req, res, next) => {
      try {

      const { userId } =req.tokenInfo;
      // // const  userId  = "26"
      // console.log("123", userId);
      
      const returnValue = await this.ordersService.cartGet(
        userId
      );
      
      if (checkErrorMessage(returnValue)) {
          return res
          .status(returnValue.code)
          .json({ errorMessage: returnValue.errorMessage });
          
      }
      res.status(201).json({
          data: returnValue
      });
      } catch (error) {
      console.log('Carts error - controller', error);
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      }    
    }

    orderPost = async (req, res, next) => {
      try {
        const { name, phone, address, data } = req.body
        const { userId } =req.tokenInfo;

        
      const returnValue = await this.ordersService.orderPost(
        name, phone, address, data, userId
      );
      
      if (checkErrorMessage(returnValue)) {
          return res
          .status(returnValue.code)
          .json({ errorMessage: returnValue.errorMessage });
          
      }
      res.status(201).json({
          data: returnValue
      });
      } catch (error) {
      console.log('Carts error - controller', error);
      res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
      }    
    }
}
module.exports = OrdersController;

