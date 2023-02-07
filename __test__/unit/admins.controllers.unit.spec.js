const AdminsController = require('../../src/controllers/admins.controllers');

const mockAdminsServices = {
  registerAdmin: jest.fn(),
  loginAdmin: jest.fn(),
  addProduct: jest.fn(),
  editProduct: jest.fn(),
  delProduct: jest.fn(),
  logoutAdmin: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
  tokenInfo: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  cookie: jest.fn(),
  clearCookie: jest.fn(),
  end: jest.fn(),
};

const adminsController = new AdminsController();
adminsController.adminsServices = mockAdminsServices;

describe('admins.controller Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('admins.controller registerAdmin 성공', async () => {
    const returnValue = {
      account: 'admin123',
      password: 'admin123admin123',
      name: '홍길동',
    };
    const requestBody = {
      inputAccount: 'admin123',
      inputPassword: 'admin123admin123',
      inputName: '홍길동',
    };
    mockRequest.body = requestBody;

    mockAdminsServices.registerAdmin = jest.fn(() => returnValue);

    await adminsController.registerAdmin(mockRequest, mockResponse);

    expect(mockAdminsServices.registerAdmin).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: `${returnValue.name} 관리자가 생성되었습니다`,
    });
  });

  test('registerAdmin의 요청이 잘못되었을 때 실패', async () => {
    const requestBody = {
      inputPassword: 'admin123admin123',
      inputName: '홍길동',
    };

    mockRequest.body = requestBody;

    await adminsController.registerAdmin(mockRequest, mockResponse);

    expect(mockAdminsServices.registerAdmin).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: '요청이 잘못되었습니다',
    });
  });

  test('registerAdmin의 adminsServices.registerAdmin 실패', async () => {
    const returnValue = {
      code: 500,
      message: '서버가 준비되지 않았습니다',
    };
    const requestBody = {
      inputAccount: 'admin123',
      inputPassword: 'admin123admin123',
      inputName: '홍길동',
    };

    mockRequest.body = requestBody;

    mockAdminsServices.registerAdmin = jest.fn(() => returnValue);

    await adminsController.registerAdmin(mockRequest, mockResponse);

    expect(mockAdminsServices.registerAdmin).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(returnValue.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: returnValue.message,
    });
  });

  test('loginAdmin의 adminsServices.loginAdmin 성공', async () => {
    const returnValue = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    const requestBody = {
      inputAccount: 'admin123',
      inputPassword: 'admin123admin123',
    };

    mockRequest.body = requestBody;

    mockAdminsServices.loginAdmin = jest.fn(() => returnValue);

    await adminsController.loginAdmin(mockRequest, mockResponse);

    expect(mockAdminsServices.loginAdmin).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.cookie).toHaveBeenCalledTimes(2);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: '관리자가 로그인했습니다',
    });
  });

  test('loginAdmin의 요청이 잘못됬을 때 실패', async () => {
    const requestBody = {
      inputPassword: 'admin123admin123',
    };

    mockRequest.body = requestBody;

    await adminsController.loginAdmin(mockRequest, mockResponse);

    expect(mockAdminsServices.loginAdmin).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.cookie).toHaveBeenCalledTimes(0);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: '요청이 잘못되었습니다',
    });
  });

  test('loginAdmin의 adminsServices.loginAdmin 실패', async () => {
    const returnValue = {
      code: '400',
      message: '아이디 또는 비밀번호가 틀렸습니다.',
    };
    const requestBody = {
      inputAccount: 'admin123',
      inputPassword: 'admin123admin123',
    };

    mockRequest.body = requestBody;

    mockAdminsServices.loginAdmin = jest.fn(() => returnValue);

    await adminsController.loginAdmin(mockRequest, mockResponse);

    expect(mockAdminsServices.loginAdmin).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(returnValue.code);
    expect(mockResponse.cookie).toHaveBeenCalledTimes(0);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: returnValue.message,
    });
  });

  test('addProduct의 adminsServices.addProduct 성공', async () => {
    const returnValue = {
      name: '돼지고기',
      price: '19900',
      description: '국내산 돼지고기',
      img: '2023-02-06-17-56-11-돼지고기.jpg',
      quantity: 10,
      adminId: 1,
    };
    const requestTokenInfo = { adminId: 1 };
    const requestBody = {
      inputName: '돼지고기',
      inputPrice: '19900',
      inputDesc: '국내산 돼지고기',
      inputImage: '2023-02-06-17-56-11-돼지고기.jpg',
      inputQuantity: 10,
    };

    mockRequest.body = requestBody;
    mockRequest.tokenInfo = requestTokenInfo;

    mockAdminsServices.addProduct = jest.fn(() => returnValue);

    await adminsController.addProduct(mockRequest, mockResponse);

    expect(mockAdminsServices.addProduct).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: '상품이 추가되었습니다',
    });
  });

  test('addProduct의 요청이 잘못됬을 때 실패', async () => {
    const requestTokenInfo = { adminId: 1 };
    const requestBody = {
      inputDesc: '국내산 돼지고기',
      inputImage: '2023-02-06-17-56-11-돼지고기.jpg',
      inputQuantity: 10,
    };

    mockRequest.body = requestBody;
    mockRequest.tokenInfo = requestTokenInfo;

    await adminsController.addProduct(mockRequest, mockResponse);

    expect(mockAdminsServices.addProduct).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: '요청이 잘못되었습니다.',
    });
  });

  test('addProduct의 adminsServices.addProduct 실패', async () => {
    const returnValue = {
      code: 500,
      message: '서버가 준비되지 않았습니다',
    };
    const requestTokenInfo = { adminId: 1 };
    const requestBody = {
      inputName: '돼지고기',
      inputPrice: '19900',
      inputDesc: '국내산 돼지고기',
      inputImage: '2023-02-06-17-56-11-돼지고기.jpg',
      inputQuantity: 10,
    };

    mockRequest.body = requestBody;
    mockRequest.tokenInfo = requestTokenInfo;

    mockAdminsServices.addProduct = jest.fn(() => returnValue);

    await adminsController.addProduct(mockRequest, mockResponse);

    expect(mockAdminsServices.addProduct).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(returnValue.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: returnValue.message,
    });
  });

  test('addProduct의 요청이 잘못됬을 때 실패', async () => {
    const requestTokenInfo = { adminId: 1 };
    const requestBody = {
      inputDesc: '국내산 돼지고기',
      inputImage: '2023-02-06-17-56-11-돼지고기.jpg',
      inputQuantity: 10,
    };

    mockRequest.body = requestBody;
    mockRequest.tokenInfo = requestTokenInfo;

    await adminsController.addProduct(mockRequest, mockResponse);

    expect(mockAdminsServices.addProduct).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: '요청이 잘못되었습니다.',
    });
  });

  test('editProduct의 adminsServices.editProduct 성공', async () => {
    const returnValue = {
      name: '돼지고기',
      price: '19900',
      description: '국내산 돼지고기',
      img: '2023-02-06-17-56-11-돼지고기.jpg',
      quantity: 10,
    };
    const requestTokenInfo = { adminId: 1 };
    const requestBody = {
      inputName: '돼지고기',
      inputPrice: '19900',
      inputDesc: '국내산 돼지고기',
      inputImage: '2023-02-06-17-56-11-돼지고기.jpg',
      inputQuantity: 10,
      productId: 1,
    };

    mockRequest.body = requestBody;
    mockRequest.tokenInfo = requestTokenInfo;

    mockAdminsServices.editProduct = jest.fn(() => returnValue);

    await adminsController.editProduct(mockRequest, mockResponse);

    expect(mockAdminsServices.editProduct).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: '상품이 수정 되었습니다',
    });
  });

  test('editProduct의 adminsServices.editProduct 실패', async () => {
    const returnValue = {
      code: 500,
      message: '서버가 준비되지 않았습니다',
    };
    const requestTokenInfo = { adminId: 1 };
    const requestBody = {
      inputName: '돼지고기',
      inputPrice: '19900',
      inputDesc: '국내산 돼지고기',
      inputImage: '2023-02-06-17-56-11-돼지고기.jpg',
      inputQuantity: 10,
      productId: 1,
    };

    mockRequest.body = requestBody;
    mockRequest.tokenInfo = requestTokenInfo;

    mockAdminsServices.editProduct = jest.fn(() => returnValue);

    await adminsController.editProduct(mockRequest, mockResponse);

    expect(mockAdminsServices.editProduct).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(returnValue.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: returnValue.message,
    });
  });

  test('delProduct의 adminsServices.delProduct 성공', async () => {
    const returnValue = 1;
    const requestParams = { productId: 1 };

    mockRequest.params = requestParams;

    mockAdminsServices.delProduct = jest.fn(() => returnValue);

    await adminsController.delProduct(mockRequest, mockResponse);

    expect(mockAdminsServices.delProduct).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.end).toHaveBeenCalledTimes(1);
  });

  test('delProduct의 adminsServices.delProduct 실패', async () => {
    const returnValue = { code: 404, message: '상품을 찾을 수 없습니다' };
    const requestParams = { productId: 1 };

    mockRequest.params = requestParams;

    mockAdminsServices.delProduct = jest.fn(() => returnValue);

    await adminsController.delProduct(mockRequest, mockResponse);

    expect(mockAdminsServices.delProduct).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(returnValue.code);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: returnValue.message,
    });
  });

  test('logoutAdmin의 adminsServices.logoutAdmin 성공', async () => {
    await adminsController.logoutAdmin(mockRequest, mockResponse);

    expect(mockResponse.clearCookie).toHaveBeenCalledTimes(2);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.end).toHaveBeenCalledTimes(1);
  });
});
