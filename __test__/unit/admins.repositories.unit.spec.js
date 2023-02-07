const { Admin, Product } = require('../../src/db/models/index');
const AdminRepositories = require('../../src/repositories/admins.repositories');

const mockAdminsRepositories = {
  registerAdmin: jest.fn(),
  loginAdmin: jest.fn(),
  addProduct: jest.fn(),
  editProduct: jest.fn(),
  delProduct: jest.fn(),
  getAdmin: jest.fn(),
};

const mockAdmin = {
  create: jest.fn(),
  findOne: jest.fn(),
};

const mockProduct = {
  create: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  destroy: jest.fn(),
};

const adminsRepositories = new AdminRepositories();
adminsRepositories.Admin = mockAdmin;
adminsRepositories.Product = mockProduct;

describe('admins.repository Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('registerAdmin의 성공', async () => {
    const mockParam = ['admin123', 'hashPassword', '홍길동', 'randomSalt'];
    const returnValue = {
      account: 'admin123',
      password: 'hashPassword',
      salt: 'randomSalt',
      name: '홍길동',
      rating: 'normal',
    };

    mockAdmin.create = jest.fn(() => returnValue);

    await adminsRepositories.registerAdmin(...mockParam);

    expect(mockAdmin.create).toHaveBeenCalledTimes(1);
  });

  test('registerAdmin의 성공', async () => {
    const mockParam = ['admin123', 'hashPassword', '홍길동', 'randomSalt'];
    const returnValue = {
      account: 'admin123',
      password: 'hashPassword',
      salt: 'randomSalt',
      name: '홍길동',
      rating: 'normal',
    };

    mockAdmin.create = jest.fn(() => returnValue);

    await adminsRepositories.registerAdmin(...mockParam);

    expect(mockAdmin.create).toHaveBeenCalledTimes(1);
  });

  test('getAdmin의 성공', async () => {
    const mockParam = 'admin123';
    const returnValue = {
      account: 'admin123',
      password: 'hashPassword',
      salt: 'randomSalt',
      name: '홍길동',
      rating: 'normal',
    };

    mockAdmin.findOne = jest.fn(() => returnValue);

    await adminsRepositories.getAdmin(mockParam);

    expect(mockAdmin.findOne).toHaveBeenCalledTimes(1);
  });

  test('addProduct의 성공', async () => {
    const mockParam = [
      '돼지고기',
      '19900',
      '국내산 돼지고기',
      '2023-02-06-17-56-11-돼지고기.jpg',
      10,
      1,
    ];
    const returnValue = {
      name: '돼지고기',
      price: '19900',
      description: '국내산 돼지고기',
      img: '2023-02-06-17-56-11-돼지고기.jpg',
      quantity: 10,
      adminId: 1,
    };

    mockProduct.create = jest.fn(() => returnValue);

    await adminsRepositories.addProduct(...mockParam);

    expect(mockProduct.create).toHaveBeenCalledTimes(1);
  });

  test('editProduct의 성공', async () => {
    const mockParam = [
      '돼지고기',
      '19900',
      '국내산 돼지고기',
      '2023-02-06-17-56-11-돼지고기.jpg',
      10,
      1,
      1,
    ];
    const returnValue = {
      name: '돼지고기',
      price: '19900',
      description: '국내산 돼지고기',
      img: '2023-02-06-17-56-11-돼지고기.jpg',
      quantity: 10,
      adminId: 1,
    };

    mockProduct.update = jest.fn(() => returnValue);

    await adminsRepositories.editProduct(...mockParam);

    expect(mockProduct.update).toHaveBeenCalledTimes(1);
  });

  test('delProduct의 성공', async () => {
    const mockParam = 1;
    const returnValue = {
      img: '2023-02-06-17-56-11-돼지고기.jpg',
    };

    mockProduct.findOne = jest.fn(() => returnValue);
    mockProduct.destroy = jest.fn(() => 1);

    await adminsRepositories.delProduct(mockParam);

    expect(mockProduct.findOne).toHaveBeenCalledTimes(1);
    expect(mockProduct.destroy).toHaveBeenCalledTimes(1);
  });
});
