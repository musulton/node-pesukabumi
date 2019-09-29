const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    fullname: {
        type: String,
        trim: true
    },
    birthday: {
        type: Date
    },
    gender: {
        type: String,
        trim: true
    },
    phonenumber: {
        type: Number
    },
    postalcode: {
        type: Number
    }
});

module.exports = {
    profileSchema
};