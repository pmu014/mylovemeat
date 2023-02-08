
const { Cart } = require("../db/models");
const { User } = require("../db/models");
const { Product } = require("../db/models");
const { Order } = require("../db/models");

class OrdersRepository {

    cartGet = async(userId) => {
        const returnValue = []
        const cartFind = await Cart.findAll({ 
            where: {userId}
        });
        const userFind = await User.findOne({ 
            where: {id : userId}
        });
        const userName = userFind.dataValues.name;
        const address = userFind.dataValues.address;
        const phone = userFind.dataValues.phone;
        returnValue.push({
            userName,
            address,
            phone}
        )

        for (let i = 0; i < cartFind.length; i++){
            const quantity = cartFind[i].dataValues.quantity;
            const productId = cartFind[i].dataValues.productId;
            const productFind = await Product.findOne({ 
                where: {id : productId},
                paranoid: false
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
        return returnValue;
    }
    orderPost = async (name, phone, address, data, userId) => {
        try {
            const returnValues = []
            for (let i = 1; i < data.length; i++){
                let returnValue = await Order.create(
                    {
                        name,
                        phone,
                        address,
                        productId: data[i].productId,
                        userId,
                        quantity: data[i].quantity,
                        status: "발송준비"
                    }
                    );
                returnValues.push(returnValue)
                } 
            return returnValues;
        } catch (err) {
            console.log("OrderOrder-err", err);
            return {
                code: 400,
                message: '요청한 데이터 형식이 올바르지 않습니다.',
        }}
        }
}

module.exports = OrdersRepository;