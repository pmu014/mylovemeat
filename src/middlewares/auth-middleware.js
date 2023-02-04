const jwt = require('jsonwebtoken');

require('dotenv').config();

const authToken = (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken || !refreshToken) {
    res.send(
      "<script>alert('로그인 후 이용 가능합니다.');location.href='/admin_login';</script>"
    );
  }

  console.log(
    verifyRefreshToken(accessToken),
    verifyRefreshToken(refreshToken)
  );

  if (!verifyAccessToken(accessToken)) {
    if (!verifyRefreshToken(refreshToken)) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      res.send(
        "<script>alert('로그인 후 이용 가능합니다.');location.href='/admin_login';</script>"
      );
    }

    const refreshTokenInfo = jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET_KEY
    );

    const accessToken = jwt.sign(
      {
        type: 'JWT',
        adminId: refreshTokenInfo.adminId,
        accountId: refreshTokenInfo.accountId,
        rating: refreshTokenInfo.rating,
      },
      process.env.ACCESS_JWT_SECRET_KET,
      {
        expiresIn: '5m',
      }
    );

    res.cookie('accessToken', accessToken);
  }
  console.log('체크1');
  const accessTokenInfo = jwt.verify(
    accessToken,
    process.env.ACCESS_JWT_SECRET_KET
  );
  if (!verifyRefreshToken(refreshToken)) {
    const refreshToken = jwt.sign(
      {
        type: 'JWT',
        adminId: accessTokenInfo.adminId,
        accountId: accessTokenInfo.accountId,
        rating: accessTokenInfo.rating,
      },
      process.env.REFRESH_JWT_SECRET_KEY,
      {
        expiresIn: '5h',
      }
    );

    res.cookie('refreshToken', refreshToken);
  }

  console.log('체크2');
  req.adminInfo = accessTokenInfo;
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

module.exports = authToken;
