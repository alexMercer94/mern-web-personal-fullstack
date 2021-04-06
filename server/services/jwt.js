const jwt = require('jwt-simple');
const moment = require('moment');

const SECRET_KEY = 'ESTA_ES_una_llav3_secreta';

/**
 * Create Access Token
 * @param {*} user User's data
 */
exports.createAccessToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        createdTokenAt: moment().unix(),
        exp: moment().add(3, 'hours').unix(),
    };

    return jwt.encode(payload, SECRET_KEY);
};

/**
 * Refresh token
 * @param {*} user User's data
 */
exports.createRefreshToken = (user) => {
    const payload = {
        id: user._id,
        exp: moment().add(30, 'days').unix(),
    };

    return jwt.encode(payload, SECRET_KEY);
};

/**
 * Decode token
 * @param {*} token
 */
exports.decodeToken = (token) => {
    return jwt.decode(token, SECRET_KEY, true);
};
