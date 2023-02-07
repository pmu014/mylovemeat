
const UsersService = require('../services/users.service');
const checkErrorMessage = require('../utills/check-errorMessage');

class UsersController {
    usersService = new UsersService();

    createUser = async (req, res) => {
            try {
            const { account, password, name, address, phone } = req.body;
            
            const returnValue = await this.usersService.createUser(
                account,
                password,
                name,
                address,
                phone,
            );
        
            if (checkErrorMessage(returnValue)) {
                return res
                .status(returnValue.code)
                .json({ errorMessage: returnValue.errorMessage });
                
            }
            res.status(201).json({
                message: "회원가입이 완료되었습니다",
            });
            } catch (error) {
            console.log('signup error - controller', error);
            res.status(400).json({ errorMessage: '요청이 올바르지 않습니다.' });
            }    
        }

    loginUser = async (req, res) => {

        const { account, password } = req.body;

        const returnValue = await this.usersService.loginUser(
            account,
            password
        );
        if (checkErrorMessage(returnValue)) {
            return res
            .status(returnValue.code)
            .json({ errorMessage: returnValue.errorMessage });
        }

        res.cookie("accessToken", returnValue.accessToken);
        res.cookie("refreshToken", returnValue.refreshToken);
        console.log(returnValue.accessToken);
        console.log(returnValue.refreshToken);
        res.status(200).json({ message: '로그인 되었습니다' });
        };
    
    logoutUser = (req, res, next) => {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
    
        res.status(200).redirect('/user_login');
        };
}

module.exports = UsersController;