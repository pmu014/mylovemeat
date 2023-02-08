const ProductsServices = require('../services/products.services');

const checkErrorMessage = require('../utills/check-errorMessage');
class ProductsController {
  productsServices = new ProductsServices();

  getProducts = async (req, res) => {
    try {
      const products = await this.productsServices.getProducts();
      if (checkErrorMessage(products)) {
        return res
          .status(products.code)
          .json({ errorMessage: products.message });
      }
      res.status(200).json({ products });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send({ errorMessage: '해당 상품이 존재하지 않습니다.' });
    }
  };

  getProduct = async (req, res) => {
    try {
      const { productId } = req.params;

      const products = await this.productsServices.getProduct(productId);
      if (checkErrorMessage(products)) {
        return res
          .status(products.code)
          .json({ errorMessage: products.message });
      }
      res.status(200).json({ products });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send({ errorMessage: '해당 상품이 존재하지 않습니다.' });
    }
  };

  cartProduct = async (req, res) => {
    try {
      const { userId } = req.tokenInfo;

      const { productId, quantity } = req.body;
      const productid = await this.productsServices.productIdFind(
        userId,
        productId
      );

      if (productid !== null) {
        return res
          .status(409)
          .json({ errorMessage: '이미 장바구니에 상품이 존재합니다' });
      }
      const carts = await this.productsServices.cartProduct(
        productId,
        quantity,
        userId
      );

      if (checkErrorMessage(carts)) {
        return res.status(carts.code).json({ errorMessage: carts.message });
      }
      res.status(201).json({ message: '장바구니에 담겼습니다.' });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send({ errorMessage: '입력한 요청이 잘못되었습니다' });
    }
  };
}

module.exports = ProductsController;
