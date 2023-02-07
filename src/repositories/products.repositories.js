class ProductsRepositories {
  constructor(Product) {
    this.Product = Product;
  }

  getProducts = async () => {
    const returnValue = await this.Product.findAll();

    return returnValue;
  };

  getProduct = async (productId) => {
    const returnValue = await this.Product.findByPk(productId);

    return returnValue;
  };
}

module.exports = ProductsRepositories;
