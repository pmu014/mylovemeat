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
    productFind = async(productIdList) => {
        const productFind = await this.Product.findAll({
            raw: true, 
            where: {id : productIdList},
            paranoid: false
        });
        console.log("productFind", productFind)
        return productFind
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