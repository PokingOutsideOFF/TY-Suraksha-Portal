const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    name: String,
    filepath: String,
    uploaded: {type: Date, default: Date.now},
    Insurance_company: String,
    status: {type: String, default: 'Not forwarded.'},
    remittance_advice: {type: String, default: 'N/A'}
}, {collection: 'cinformation'});

module.exports = clientSchema;