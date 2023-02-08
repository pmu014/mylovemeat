
const { User } = require("../db/models");

class UsersRepository {

    createUser = async(account,
        password,
        name,
        address,
        phone,
        salt) => {

        const returnValue = await User.create({ account,
            password,
            name,
            address,
            phone,
            salt });

        return returnValue;
    }
    findUser = async(account) => {
        const users = await User.findAll({
            where: { account }
        });
        return users;
    }
    findPhone = async(phone) => {
        const users = await User.findAll({
            where: { phone }
        });
        return users;
    }
    findOne = async(account) => {
        const users = await User.findOne({
            where: { account }
        });
        return users;
    }
}

module.exports = UsersRepository;