var users = require('../../models/users');
var settings = require('../../settings');
var DB = require('../../DB');
var auth = require('../auth').auth;
var express = require('express');
var jwt = require('jsonwebtoken');

var Kafka = require('no-kafka');
var connectionStr = "172.17.0.3:9092";
var producer = new Kafka.Producer({
  connectionString:connectionStr
});



// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {
  auth(req,
    next,
    function(){
      return res.status(403).send({
        success: false,
        message: 'Invalid Token'
      });
    });
});

apiRoutes.get('/mc', function(req, res) {
  publishKafka('test', 'data reciveed from:'+req.decoded);
  res.json({ message: 'Welcome to the coolest API on earth!' });
});


apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/user', function(req, res) {
  DB.User.find({}, function(err, users) {
    res.json(users);
  });
});

apiRoutes.get('/check', function(req, res) {
  res.json({"data":req.decoded});
});

function publishKafka(topic, message){
    producer.init().then(function(){
        var strMessage = JSON.stringify(message);
        console.log('sent message to kafka '+strMessage+' in topic '+topic);
        return producer.send({
            connectionString: connectionStr,
            topic: topic,
            partition: 0,
            message: {
                value: strMessage
            }
        });
    });
}

module.exports = apiRoutes;
