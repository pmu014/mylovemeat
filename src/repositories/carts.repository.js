const { Cart } = require('../db/models');
const { User } = require('../db/models');
const { Product } = require('../db/models');
const { Op } = require('sequelize');

class CartsRepository {
  cartGet = async (userId) => {
    try {
      const returnValue = [];
      const cartFind = await Cart.findAll({
        where: { userId },
      });
      for (let i = 0; i < cartFind.length; i++) {
        const quantity = cartFind[i].dataValues.quantity;
        const productId = cartFind[i].dataValues.productId;
        const productFind = await Product.findOne({
          where: { id: productId },
          paranoid: false,
        });
        const name = productFind.dataValues.name;
        const price = productFind.dataValues.price;
        const img = productFind.dataValues.img;
        const desc = productFind.dataValues.description;
        returnValue.push({
          productId,
          quantity,
          name,
          price,
          img,
          desc,
        });
      }
      return returnValue;
    } catch (err) {
      console.log('cartsRepositories cartGet :', err);
      return { code: 500, message: '서버가 준비되지 않았습니다.' };
    }
  };

  cartDelete = async (userId, productId) => {
    try {
      const returnValue = await Cart.destroy({
        where: {
          [Op.and]: [{ userId }, { productId }],
        },
      });

      return returnValue;
    } catch (err) {
      console.log('cartsRepositories delProduct :', err);
      return { code: 500, message: '서버가 준비되지 않았습니다.' };
    }
  };

  cartPut = async (userId, productId, quantity) => {
    try {
      const returnValue = await Cart.update(
        { quantity },

        {
          where: {
            [Op.and]: [{ userId }, { productId }],
          },
        }
      );

      return returnValue;
    } catch (err) {
      console.log('cartsRepositories putProduct :', err);
      return { code: 500, message: '서버가 준비되지 않았습니다.' };
    }
  };
}

module.exports = CartsRepository;
