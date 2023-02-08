const AdminsServices = require('../../src/services/admins.services');

const mockAdminsRepositories = {
  registerAdmin: jest.fn(),
  loginAdmin: jest.fn(),
  addProduct: jest.fn(),
  editProduct: jest.fn(),
  delProduct: jest.fn(),
  getAdmin: jest.fn(),
};

const mockHashedPassword = {
  createHashedPassword: jest.fn(),
  verifyPassword: jest.fn(),
};

const mockCreateToken = {
  createAccessToken: jest.fn(),
  createRefreshToken: jest.fn(),
};

const adminsServices = new AdminsServices();
adminsServices.adminRepositories = mockAdminsRepositories;
adminsServices.hashedPassword = mockHashedPassword;
adminsServices.createToken = mockCreateToken;

describe('admins.service Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('registerAdmin의 성공', async () => {
    const mockParam = ['admin123', 'admin123admin123', '홍길동'];
    const returnValue = {
      account: 'admin123',
      password: 'admin123admin123',
      name: '홍길동',
    };
    const encyptionPassword = { password: 'hashPassword', salt: 'randomSalt' };

    mockHashedPassword.createHashedPassword = jest.fn(() => encyptionPassword);
    mockAdminsRepositories.registerAdmin = jest.fn(() => returnValue);

    await adminsServices.registerAdmin(...mockParam);

    expect(mockHashedPassword.createHashedPassword).toHaveBeenCalledTimes(1);
    expect(mockAdminsRepositories.registerAdmin).toHaveBeenCalledTimes(1);
  });

  test('loginAdmin의 성공', async () => {
    const mockParam = ['admin123', 'admin123admin123'];
    const returnValue = {
      password: 'hashPassword',
      salt: 'randomSalt',
    };
    const checkPassword = true;

    mockAdminsRepositories.getAdmin = jest.fn(() => returnValue);
    mockHashedPassword.verifyPassword = jest.fn(() => checkPassword);
    await adminsServices.loginAdmin(...mockParam);

    expect(mockAdminsRepositories.getAdmin).toHaveBeenCalledTimes(1);
    expect(mockHashedPassword.verifyPassword).toHaveBeenCalledTimes(1);
    expect(mockCreateToken.createAccessToken).toHaveBeenCalledTimes(1);
    expect(mockCreateToken.createRefreshToken).toHaveBeenCalledTimes(1);
  });

  test('loginAdmin의 adminRepositories.getAdmin null 실패', async () => {
    const mockParam = ['admin123', 'admin123admin123'];
    const returnValue = null;

    mockAdminsRepositories.getAdmin = jest.fn(() => returnValue);
    await adminsServices.loginAdmin(...mockParam);

    expect(mockAdminsRepositories.getAdmin).toHaveBeenCalledTimes(1);
    expect(mockHashedPassword.verifyPassword).toHaveBeenCalledTimes(0);
    expect(mockCreateToken.createAccessToken).toHaveBeenCalledTimes(0);
    expect(mockCreateToken.createRefreshToken).toHaveBeenCalledTimes(0);
  });

  test('loginAdmin의 hashedPassword.verifyPassword false 실패', async () => {
    const mockParam = ['admin123', 'admin123admin123'];
    const returnValue = {
      password: 'hashPassword',
      salt: 'randomSalt',
    };
    const checkPassword = false;

    mockAdminsRepositories.getAdmin = jest.fn(() => returnValue);
    mockHashedPassword.verifyPassword = jest.fn(() => checkPassword);
    await adminsServices.loginAdmin(...mockParam);

    expect(mockAdminsRepositories.getAdmin).toHaveBeenCalledTimes(1);
    expect(mockHashedPassword.verifyPassword).toHaveBeenCalledTimes(1);
    expect(mockCreateToken.createAccessToken).toHaveBeenCalledTimes(0);
    expect(mockCreateToken.createRefreshToken).toHaveBeenCalledTimes(0);
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

    mockAdminsRepositories.addProduct = jest.fn(() => returnValue);
    await adminsServices.addProduct(...mockParam);

    expect(mockAdminsRepositories.addProduct).toHaveBeenCalledTimes(1);
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

    mockAdminsRepositories.editProduct = jest.fn(() => returnValue);
    await adminsServices.editProduct(...mockParam);

    expect(mockAdminsRepositories.editProduct).toHaveBeenCalledTimes(1);
  });

  test('delProduct의 성공', async () => {
    const mockParam = 1;
    const returnValue = {
      name: '돼지고기',
      price: '19900',
      description: '국내산 돼지고기',
      img: '2023-02-06-17-56-11-돼지고기.jpg',
      quantity: 10,
      adminId: 1,
    };

    mockAdminsRepositories.delProduct = jest.fn(() => returnValue);
    await adminsServices.delProduct(mockParam);

    expect(mockAdminsRepositories.delProduct).toHaveBeenCalledTimes(1);
  });
});
