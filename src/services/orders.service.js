const { Cart, User, Product, Order } = require("../db/models");

const OrdersRepository = require('../repositories/orders.repository');

class  OrdersService {
    ordersRepository = new OrdersRepository(Cart, User, Product, Order);

        cartGet = async (userId) => {
        try {
            const returnValue = []            
            const cartFind = await this.ordersRepository.cartFind(
                userId
            );
            
            const userFind = await this.ordersRepository.userFind(
                userId
            );
            console.log(userFind);
            const userName = userFind.name;
            const address = userFind.address;
            const phone = userFind.phone;
            returnValue.push({
                userName,
                address,
                phone}
            )
            
            const productIdList = []
            for (let i = 0; i < cartFind.length; i++){
                productIdList.push(cartFind[i].productId)
                }
                
            const productFind = await this.ordersRepository.productFind(
                productIdList
            );

            for (let i = 0; i < productFind.length; i++){
                const name = productFind[i].name;
                const price = productFind[i].price;
                const img = productFind[i].img;
                const desc = productFind[i].description;
                const quantity = cartFind[i].quantity;
                const productId = cartFind[i].productId;    
    
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




            
        } catch (err) {
            console.log("OrderCartGet-err", err);
            return {
                code: 400,
                message: '요청한 데이터 형식이 올바르지 않습니다.',
        }}
        }
    
        orderPost = async (name, phone, address, data, userId) => {
        try {            
            const returnValue = await this.ordersRepository.orderPost(
                name, phone, address, data, userId
            );
            return returnValue;
        } catch (err) {
            console.log("OrderPost-err", err);
            return {
                code: 400,
                message: '요청한 데이터 형식이 올바르지 않습니다.',
        }}
        }
    
    
}

module.exports = OrdersService;