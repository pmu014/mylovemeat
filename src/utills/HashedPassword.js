const crypto = require('crypto');

class HashedPassword {
  createSalt = () => {
    return crypto.randomBytes(64).toString('base64');
  };

  createHashedPassword = (inputPassword) => {
    return new Promise((resolve, rejects) => {
      const salt = this.createSalt();
      crypto.pbkdf2(inputPassword, salt, 10401, 64, 'sha512', (err, key) => {
        if (err) rejects(err);
        resolve({ password: key.toString('base64'), salt });
      });
    });
  };

  verifyPassword = async (inputPassword, adminPassword, adminSalt) => {
    return new Promise((resolve, rejects) => {
      crypto.pbkdf2(
        inputPassword,
        adminSalt,
        10401,
        64,
        'sha512',
        (err, key) => {
          if (err) rejects(err);

          if (key.toString('base64') !== adminPassword) resolve(false);

          resolve(true);
        }
      );
    });
  };
}

module.exports = HashedPassword;
