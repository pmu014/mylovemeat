const { Op } = require("sequelize");
class ProductsRepositories {
  constructor(Product,Cart) {
    this.Product = Product;
    this.Cart = Cart;
  }

  getProducts = async () => {
      const products = await this.Product.findAll();
      return products;
  };

  getProduct = async (productId) => {
      const products = await this.Product.findOne({where: {id:productId}});
      return products;
  };
  productIdFind = async(userId,productId) =>{
      const productid = await this.Cart.findOne({where : {[Op.and] : [{userId},{productId}] }});
      // console.log(productId)
      return productid;
}
  // userIdFind = async(userId)=>{
  //   const userid = await this.User.findOne({where : {id:userId}});
  //   return userId;
  // }
  cartProduct = async(productId,quantity,userId) =>{
      const carts = await this.Cart.create({productId,quantity,userId});
      return carts;
  }
  
  
}

module.exports = ProductsRepositories;
