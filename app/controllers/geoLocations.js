const request = require('request');
const sharp = require('sharp');
const Location = require('../models/locations');

const { GEOCODE_LAT_LONG, GEOCODE_ADDRESS } = require('../configs/baseUrl');
const response = require('../response/res');

const getAddress = (req, res) => {
    const { lat, long } = req.body;
    const url = `${GEOCODE_LAT_LONG}${lat},${long}&key=${process.env.GEOCODE_API_KEY}`;
    request(url, (error, result, body) => {
        if (error) response.err(error, res);
        response.ok(JSON.parse(body), res);
    })
};

const getCoordinates = (req, res) => {
    const { address } = req.body;
    const url = `${GEOCODE_ADDRESS}${address}&key=${process.env.GEOCODE_API_KEY}`;
    request(url, (error, result, body) => {
        if (error) response.err(error, res);
        response.ok(JSON.parse(body), res);
    })
};

// const uploadImage = async (req, res, next) => {
//     const { filename: image } = req.file;
//     try {
//         await sharp(req.file.path)
//             .resize(500)
//             .jpeg({ quality: 50 })
//             .toFile(
//                 path.resolve(req.file.destination, 'resized', image)
//             );
//         fs.unlinkSync(req.file.path);
//
//         addLocation(req, res);
//     } catch (error) {
//         response.err('Ada masalah saat upload', res);
//     }
// };

const addLocation = async (req, res) => {
    const { coordinates, address, title, description, facilities, ticket } = req.body;
    try {
        const location = new Location({
            coordinates,
            address,
            locationImage: req.file.path,
            title,
            description,
            facilities,
            ticket,
            user_id: req.user._id
        });
        await location.save();
        response.ok(location, res);
    } catch (error) {
        response.err(error, res);
    }
};

const updateLocation = async (req, res) => {
    try {
        const { coordinates, address, photos, title, facilities, ticket } = req.body;
        const location = await Location.findOneAndUpdate(
            { _id: req.params['location_id'], user_id: req.user._id },
            { coordinates, address, photos, title, facilities, ticket },
            { new: true });
        if (!user) throw new Error();
        response.ok(location, res);
    } catch (error) {
        response.err(error, res);
    }
};

module.exports = {
    getAddress,
    getCoordinates,
    addLocation,
    updateLocation
};