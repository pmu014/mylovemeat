const { Cart, User, Product, Order } = require("../db/models");

class OrdersRepository {
    constructor(Cart, User, Product, Order) {
        this.Cart = Cart;
        this.User = User;
        this.Product = Product;
        this.Order = Order;
    }
    cartFind =async(userId)=>{
        const cartFind = await this.Cart.findAll({ 
            // attributes: ['productId'],
            raw: true,
            where: {userId}
        });
        console.log("cartFind", cartFind);
        return cartFind
    }

    userFind = async(userId) => {
        const userFind = await this.User.findOne({ 
            raw: true,
            where: {id : userId}
        });
        console.log("userFind", userFind)
        return userFind
    }
    productFind = async(cartIds) => {
        const productFind = await this.Product.findAll({
            raw: true, 
            where: {id : cartIds},
            paranoid: false
        });
        console.log("productFind", productFind)
        return productFind
    }
    
    orderPost = async (returnValues) => {
        try {
            const returnValue = await Order.bulkCreate(returnValues);
            return returnValue;
        } catch (err) {
            console.log("OrderPost-err", err);
            return {
                code: 400,
                message: '요청한 데이터 형식이 올바르지 않습니다.',
        }}
        }
}

module.exports = OrdersRepository;