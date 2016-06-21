var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Server', new Schema({
    name: String,
    ipaddress: String,
    authPublic: String,
    authSecret: String,
}));