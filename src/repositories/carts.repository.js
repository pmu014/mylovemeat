
const { Cart } = require("../db/models");
const { User } = require("../db/models");
const { Product } = require("../db/models");

class CartsRepository {

    cartGet = async(userId) => {
        const returnValue = []
        const cartFind = await Cart.findAll({ 
            where: {userId}
        });
        for (let i = 0; i < cartFind.length; i++){
            const quantity = cartFind[i].dataValues.quantity;
            const productId = cartFind[i].dataValues.productId;
            const productFind = await Product.findOne({ 
                where: {id : productId}
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
                desc
            })
        }
        console.log(returnValue);
        return returnValue;
    }
   
}

module.exports = CartsRepository;