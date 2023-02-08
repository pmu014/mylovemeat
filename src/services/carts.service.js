
const CartsRepository = require('../repositories/carts.repository');

class  CartsService {
    cartsRepository = new  CartsRepository();
  

    cartGet = async (userId) => {
        try {            
            const returnValue = await this.cartsRepository.cartGet(
                userId
            );
            return returnValue;
        } catch (err) {
            console.log("cartOrder-err", err);
            return {
                code: 400,
                errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
        }}
        }
    
    cartDelete = async (userId, productId) => {
        const returnValue = await this.cartsRepository.cartDelete(userId, productId);

        if (!returnValue) {
            return { code: 404, message: '상품을 찾을 수 없습니다' };
        }

        return returnValue;

    }    

    cartPut = async (userId, productId, quantity) => {
        const returnValue = await this.cartsRepository.cartPut(userId, productId, quantity);

        if (!returnValue) {
            return { code: 404, message: '상품을 찾을 수 없습니다' };
        }

        return returnValue;

    }    
    
}

module.exports = CartsService;