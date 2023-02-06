const jwt = require('jsonwebtoken');

require('dotenv').config();

class CreateToken {
  createAccessToken = (tokenPayload) => {
    return jwt.sign(
      {
        ...tokenPayload,
      },
      process.env.ACCESS_JWT_SECRET_KEY,
      {
        expiresIn: '5m',
      }
    );
  };

  createRefreshToken = (tokenPayload) => {
    return jwt.sign(
      {
        ...tokenPayload,
      },
      process.env.REFRESH_JWT_SECRET_KEY,
      {
        expiresIn: '5h',
      }
    );
  };
}

module.exports = CreateToken;
