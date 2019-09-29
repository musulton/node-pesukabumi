const User = require('../models/users');
const response = require('../response/res');
const Constant = require('../constants/constants');

const create = async (req, res) => {
    try {
        const result = await createUserAndProfile(req.body, {});
        response.ok(result, res);
    } catch (error) {
        response.err(error, res);
    }
};

const createUserAndProfile = async (userCredentials, profile ) => {
    const { username, email, password } = userCredentials;
    const user = new User({ username, email, password, profile });
    await user.save();
    return user;
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) response.unauthorized(Constant.LOGIN.INVALID, res);
        const token = await user.generateAuthToken();
        response.ok({ user, token }, res);
    } catch (error) {
        response.err(error, res);
    }
};

const getUser = (req, res) => {
    response.ok(req.user, res);
};

const updateUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { username, password, email },
            { new: true });
        if (!user) throw new Error();
        response.ok(user, res);
    } catch (error) {
        response.err(error, res);
    }
};

const updateProfile = async (req, res) => {
    try {
        const { fullname, birthday, gender, postalcode } = req.body;
        const profile = await User.update({ _id: req.user._id }, {
            $set: {
                'profile.fullname': fullname,
                'profile.birthday': birthday,
                'profile.gender': gender,
                'profile.postalcode': postalcode
            }
        });
        if (!profile) throw new Error();
        response.ok(profile, res);
    } catch (error) {
        response.err(error, res);
    }
};

module.exports = {
    create,
    login,
    updateProfile,
    updateUser,
    getUser
};