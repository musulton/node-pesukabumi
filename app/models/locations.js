const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    coordinates: { type: Object, required: true },
    address: { type: Object, required: true },
    locationImage: { type: String, required: true },
    facilities: { type: Object, required: true },
    ticket: { type: Number, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;