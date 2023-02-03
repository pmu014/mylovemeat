class ProductsRepositories {
  constructor(Product) {
    this.Product = Product;
  }

  getProducts = async () => {
    const returnValue = await this.Product.findAll();

    return returnValue;
  };
}

module.exports = ProductsRepositories;
