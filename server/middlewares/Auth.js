const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

async function isAuthorized(req, res, next) {
    try {
        let accessToken = req.headers.authorization;
        if (!accessToken) {
            throw { name: 'CustomErrorUnauthorized' };
        }

        let [bearer, token] = accessToken.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw { name: 'CustomErrorUnauthorized' };
        }

        const payload = verifyToken(token);
        const user = await User.findByPk(payload.id);
        if (!user) {
            throw { name: 'CustomErrorNotFound' };
        }
        req.user = {
            id: user.id,
            email: user.email,
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = isAuthorized;