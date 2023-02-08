const jwt = require('jsonwebtoken');

const UsersRepository = require('../repositories/users.repository');
const HashedPassword = require('../utills/hashed-password');
const CreateToken = require('../utills/CreateToken');

class UsersService {
    usersRepository = new UsersRepository();
    hashedPassword = new HashedPassword();
    createToken = new CreateToken();
    
    createUser = async (account, password, name, address, phone) => {
        try {
            
            const re_phone = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
            const re_password = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,10}$/; //  4 ~ 10자 영문, 숫자 조합
    
            const user = await this.usersRepository.findUser(account);
    
            if (user) {
                return {
                    code: 409,
                    message: '이미 존재하는 아이디 입니다.',
            }}

            if (password.search(re_password) === -1) {
                return {
                    code: 400,
                    message: '비밀번호를 4~10자 영문, 숫자 조합으로 입력해주세요.',
            }}

            if (phone.search(re_phone) === -1) {
                return {
                    code: 400,
                    message: '핸드폰 번호를 숫자, -을 포함한 휴대전화 형식에 맞게 입력해주세요.',
            }}

            const encryptionPassword = await this.hashedPassword.createHashedPassword(
                password
            )
            const returnValue = await this.usersRepository.createUser(
            account,
            encryptionPassword.password,
            name,
            address,
            phone,
            encryptionPassword.salt
            );
            return returnValue;
        } catch (err) {
            console.log("createUser-err", err);
            return {
                code: 400,
                errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
        }}
        }
    
    loginUser = async (account, password) => {
            const returnValue = await this.usersRepository.findOne(account);
            if (!returnValue) {
                return{
                code: 400,
                errorMessage: '아이디 또는 비밀번호 오류입니다',
                }
            }
            
            const checkPassword = await this.hashedPassword.verifyPassword(
            password,
            returnValue.password,
            returnValue.salt
            )

            if (!checkPassword) {
                return { code: '400', errorMessage: '아이디 또는 비밀번호 오류입니다' };
            }
            
            const accessTokenPayload = 
                {
                type: 'JWT',
                userId: returnValue.dataValues.id,
                accountId: returnValue.dataValues.account,
                };

            const refreshTokenPayload = 
                {
                type: 'JWT',
                userId: returnValue.dataValues.id,
                accountId: returnValue.dataValues.account,
                };

            const accessToken = this.createToken.createAccessToken(accessTokenPayload);
            const refreshToken =
                this.createToken.createRefreshToken(refreshTokenPayload);
        
            return { accessToken, refreshToken };

    
        }
}

module.exports = UsersService;