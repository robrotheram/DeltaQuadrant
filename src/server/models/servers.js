var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Server', new Schema({
    name: String,
    uuid: String,
    token: String,
    ipaddress: String,
    _userID: {type:Schema.Types.ObjectId, ref: 'User'},
}));
