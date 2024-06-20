const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');
const { User } = require('../models');

class Auth {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw { name: 'CustomErrorRequired' };
            }
            const findUser = await User.findOne({ where: { email } });
            if (findUser) {
                throw { name: 'CustomErrorEmailExist' };
            }
            const user = await User.create({ email, password });
            res.status(201).json({ id: user.id, email: user.email });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!email || !password) {
                throw { name: 'CustomErrorRequired' };
            }

            if (user && bcrypt.compareSync(password, user.password)) {
                const access_token = generateToken({ id: user.id, email: user.email });
                return res.status(200).json({ access_token });
            }
            else {
                throw { name: 'CustomErrorInvalidCredentials' };
            }

        } catch (error) {
            next(error);
        }
    }

}

module.exports = Auth;