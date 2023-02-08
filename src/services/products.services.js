const ProductsRepositories = require('../repositories/products.repositories');
const { Product } = require('../db/models/index');
const {Cart} = require('../db/models/index');
const {User} = require('../db/models/index');


class ProductsServices {
  productsRepositories = new ProductsRepositories(Product,Cart,User);

  getProducts = async () => {
      const products = await this.productsRepositories.getProducts();
      return products;
  };

  getProduct = async (productId) => {
      const products = await this.productsRepositories.getProduct(productId);
    return products;
  };
  productIdFind = async(productId,userId) => {
    const productid = await this.productsRepositories.productIdFind(productId,userId);
    return productid;
  }
  // userIdFind = async(userId)=>{
  //   const userid = await this.productsRepositories.userIdFind(userId);
  // }
  cartProduct = async (productId,quantity,userId) =>{         
      const carts = await this.productsRepositories.cartProduct(
          productId,quantity,userId
      );
      return carts;
  } 
}



module.exports = ProductsServices;
