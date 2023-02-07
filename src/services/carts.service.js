
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
    
    
}

module.exports = CartsService;