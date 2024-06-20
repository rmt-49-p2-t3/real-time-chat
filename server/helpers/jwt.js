const { sign, verify } = require('jsonwebtoken');

const generateToken = (payload) => {
    return sign(payload, process.env.JWT_SECRET);
}

const verifyToken = (token) => {
    return verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken };