const jwt = require('jsonwebtoken');

require('dotenv').config();

const authToken = (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!verifyAccessToken(accessToken)) {
    console.log("1");
    if (!verifyRefreshToken(refreshToken)) {
      console.log("2");
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      return res.status(400).json({ errorMessage: '로그인이 만료되었습니다.' });
    }
    const info = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET_KEY);
    console.log(info.id, info.account);
    const accessToken = jwt.sign(
      {
        type: 'JWT',
        userId: info.id,
        accountId: info.account,
      },
      process.env.ACCESS_JWT_SECRET_KET,
      {
        expiresIn: '5m',
      }
    );

    res.cookie('accessToken', accessToken);
  }

  req.Info = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET_KET);
  next();
};

const verifyAccessToken = function (accessToken) {
  try {
    jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET_KET);
    return true;
  } catch (error) {
    return false;
  }
};

const verifyRefreshToken = function (refreshToken) {
  try {
    jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
};