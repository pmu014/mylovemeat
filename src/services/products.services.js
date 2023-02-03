const ProductsRepositories = require('../repositories/products.repositories');
const { Product } = require('../db/models/index');

class ProductsServices {
  productsRepositories = new ProductsRepositories(Product);

  getProducts = async () => {
    const returnValue = await this.productsRepositories.getProducts();

    return returnValue;
  };
}

module.exports = ProductsServices;
