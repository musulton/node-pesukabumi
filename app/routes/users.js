const userController = require('../controllers/users');
const auth = require('../middleware/auth');

module.exports = (app) => {
    app.route('/register').post(userController.create);
    app.route('/login').post(userController.login);
    app.route('/profile/').put(auth, userController.updateProfile);
    app.route('/user/').get(auth, userController.getUser);
};