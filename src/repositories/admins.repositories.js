class AdminRepositories {
  constructor(Admin, Product) {
    this.Admin = Admin;
    this.Product = Product;
  }

  registerAdmin = async (account, password, name, salt) => {
    console.log(account, password, name, salt);
    const returnValue = await this.Admin.create({
      account,
      password,
      salt,
      name,
      rating: 'normal',
    });

    return returnValue;
  };

  getAdmin = async (account) => {
    const returnValue = await this.Admin.findOne({ where: { account } });

    return returnValue;
  };

  addProduct = async (name, price, description, img, quantity, adminId) => {
    const returnValue = await this.Product.create({
      name,
      price,
      description,
      img,
      quantity,
      adminId,
    });

    return returnValue;
  };

  editProduct = async (
    name,
    price,
    description,
    img,
    quantity,
    adminId,
    productId
  ) => {
    const returnValue = await this.Product.update(
      { name, price, description, img, quantity, adminId },
      { where: { id: productId } }
    );

    return returnValue;
  };

  delProduct = async (productId) => {
    const { img } = await this.Product.findOne({
      where: { id: productId },
      attributes: ['img'],
    });
    const returnValue = await this.Product.destroy({
      where: { id: productId },
    });

    return { returnValue, img };
  };
}

module.exports = AdminRepositories;
