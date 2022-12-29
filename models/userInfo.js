const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
    username: String,
    access: mongoose.Types.Decimal128,
    password: String
}, { collection : 'information'});

//const info = mongoose.model('information', infoSchema);

module.exports = infoSchema;