const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Constants = require('../constants/constants');
const response = require('../response/res');

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ _id: data._id });
        if (!user) throw new Error();
        req.user = user;
        next()
    } catch (error) {
        response.err(Constants.LOGIN.UNAUTHORIZED, res)
    }
};

module.exports = auth;