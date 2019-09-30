const geoController = require('../controllers/geoLocations');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/uploadSingleImage');

module.exports = (app) => {
    app.route('/get_address').get(geoController.getAddress);
    app.route('/get_coordinate').get(geoController.getCoordinates);
    app.route('/add_location').post(auth, upload.single('locationImage'), geoController.addLocation);
};