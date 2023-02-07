class AdminRepositories {
  constructor(Admin, Product, Order) {
    this.Admin = Admin;
    this.Product = Product;
    this.Order = Order;
  }

  registerAdmin = async (account, password, name, salt) => {
    try {
      const returnValue = await this.Admin.create({
        account,
        password,
        salt,
        name,
        rating: 'normal',
      });

      return returnValue;
    } catch (err) {
      console.log('AdminsRepositories registerAdmin :', err);
      return { code: 500, message: '서버가 준비되지 않았습니다' };
    }
  };

  getAdmin = async (account) => {
    try {
      const returnValue = await this.Admin.findOne({ where: { account } });

      return returnValue;
    } catch (err) {
      console.log('AdminsRepositories getAdmin :', err);
      return { code: 500, message: '서버가 준비되지 않았습니다.' };
    }
  };

  addProduct = async (name, price, description, img, quantity, adminId) => {
    try {
      const returnValue = await this.Product.create({
        name,
        price,
        description,
        img,
        quantity,
        adminId,
      });

      return returnValue;
    } catch (err) {
      console.log('AdminsRepositories addProduct :', err);
      return { code: 500, message: '서버가 준비되지 않았습니다' };
    }
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
    try {
      const returnValue = await this.Product.update(
        { name, price, description, img, quantity, adminId },
        { where: { id: productId } }
      );

      return returnValue;
    } catch (err) {
      console.log('AdminsRepositories editProduct :', err);
      return { code: 500, message: '서버가 준비되지 않았습니다.' };
    }
  };

  delProduct = async (productId) => {
    try {
      const returnValue = await this.Product.destroy({
        where: { id: productId },
      });

      return returnValue;
    } catch (err) {
      console.log('AdminsRepositories delProduct :', err);
      return { code: 500, message: '서버가 준비되지 않았습니다.' };
    }
  };

  getOrders = async () => {
    try {
      const returnValue = await this.Order.findAll({ include: 'Product' });

      return returnValue;
    } catch (err) {
      console.log('repositories getOrders: ', err);
      return err;
    }
  };

  changeStatus = async (orderId, status) => {
    try {
      const returnValue = await this.Order.update(
        { status },
        { where: { id: orderId } }
      );

      return returnValue;
    } catch (err) {
      console.log('repositories changeStatus: ', err);
    }
  };
}

module.exports = AdminRepositories;
