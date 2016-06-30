var settings = {};
settings.logger = require('morgan');
settings.mongoose    = require('mongoose');
settings.connectionString = 'mongodb://robrotheram:mallard@ds011963.mlab.com:11963/api_example';
settings.mongoose.connect(settings.connectionString);
settings.MongoClient = require('mongodb').MongoClient;
settings.db = {};

settings.MongoClient.connect(settings.connectionString, function(err, database) {
  if(!err){
    console.log("DB link establised");
    settings.db = database;
  }
});
module.exports = settings;
