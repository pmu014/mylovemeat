const jwt = require('jsonwebtoken');

const CreateToken = require('../utills/CreateToken');

require('dotenv').config();

const adminAuthToken = (req, res, next) => {
  const createToken = new CreateToken();

  let { accessToken, refreshToken } = req.cookies;

  if (!accessToken || !refreshToken) {
    res.send(
      "<script>alert('로그인 후 이용 가능합니다.');location.href='/admin_login';</script>"
    );
  }

  let accessTokenInfo = verifyAccessToken(accessToken);
  let refreshTokenInfo = verifyRefreshToken(refreshToken);

  if (!accessTokenInfo) {
    if (!refreshTokenInfo) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.send(
        "<script>alert('로그인이 만료 되었습니다.');location.href='/admin_login';</script>"
      );
    }

    accessToken = createToken.createAccessToken(refreshTokenInfo);

    res.cookie('accessToken', accessToken);
    accessTokenInfo = verifyAccessToken(accessToken);
  }

  if (!refreshTokenInfo) {
    refreshToken = createToken.createRefreshToken(accessTokenInfo);
    res.cookie('refreshToken', refreshToken);
  }

  req.tokenInfo = accessTokenInfo;
  next();
};

const verifyAccessToken = function (accessToken) {
  try {
    const { iat, exp, ...accessTokenInfo } = jwt.verify(
      accessToken,
      process.env.ACCESS_JWT_SECRET_KEY
    );

    return accessTokenInfo;
  } catch (error) {
    return false;
  }
};

const verifyRefreshToken = function (refreshToken) {
  try {
    const { iat, exp, ...refreshTokenInfo } = jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET_KEY
    );
    return refreshTokenInfo;
  } catch (error) {
    return false;
  }
};

module.exports = adminAuthToken;
