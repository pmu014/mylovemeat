const ProductsServices = require('../services/products.services');

class ProductsController {
  productsServices = new ProductsServices();

  getProducts = async (req, res) => {
    const returnValue = await this.productsServices.getProducts();

    res.status(200).json({ returnValue });
  };

  getProduct = async (req, res) => {
    const { productId } = req.params;

    const returnValue = await this.productsServices.getProduct(productId);

    res.status(200).json({ returnValue });
  };
}

module.exports = ProductsController;
