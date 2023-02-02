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
}

module.exports = AdminRepositories;
