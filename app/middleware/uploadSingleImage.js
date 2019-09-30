const multer = require('multer');
const _ = require('lodash');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/locations');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
    if (_.includes(allowedMimes, file.mimetype)) cb(null, true);
    else cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'), false)
};

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 2 }, fileFilter: fileFilter });

module.exports = {
    upload
};