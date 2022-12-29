const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    name: String,
    filepath: String,
    uploaded: {type: Date, default: Date.now},
}, {collection: 'cinformation'});

module.exports = clientSchema;