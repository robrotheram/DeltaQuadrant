var settings = require('./settings');
var mongoose = require('mongoose');

var userSchema = require('./models/users');
var serverSchema = require('./models/servers');
mongoose.connect(settings.connectionString);

//db settings
var user = mongoose.model('User', userSchema.User);
var server = mongoose.model('Server', serverSchema.Server);

module.exports = {
  User: user,
  Server: server,
};
