
const OrdersRepository = require('../repositories/orders.repository');

class  OrdersService {
    ordersRepository = new  OrdersRepository();

        cartGet = async (userId) => {
        try {            
            const returnValue = await this.ordersRepository.cartGet(
                userId
            );
            return returnValue;
        } catch (err) {
            console.log("OrderOrder-err", err);
            return {
                code: 400,
                errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
        }}
        }
    
        orderPost = async (name, phone, address, data, userId) => {
        try {            
            const returnValue = await this.ordersRepository.orderPost(
                name, phone, address, data, userId
            );
            return returnValue;
        } catch (err) {
            console.log("OrderOrder-err", err);
            return {
                code: 400,
                errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
        }}
        }
    
    
}

module.exports = OrdersService;