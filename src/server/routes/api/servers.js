var users = require('../../models/users');
var settings = require('../../settings');
var DB = require('../../DB');

var uuid = require('node-uuid');
var express = require('express');
var auth = require('../auth').auth;
var router = express.Router();
var jwt = require('jsonwebtoken');

router.use(function(req, res, next) {
  auth(req,
    next,
    function(){
      return res.status(403).send({
        success: false,
        message: 'Authentication Failed'
      });
    });
});

router.post('/add', function(req, res) {
  var server_id = uuid.v4();
  var server_name = req.body.name;
  var server_token = jwt.sign({ "server_id" : server_id }, settings.secret);
  var server_url = req.body.url;
  var userID = req.decoded.userID;
  console.log("decoded token",req.decoded);

  DB.Server.findOne({"ipaddress":server_url}, function(err, server) {
    if(err || server){
      return res.status(403).send({
        success: false,
        message: 'A server exists at that ip adress',
        error : err
      });
    }
    server = new DB.Server({
      uuid : server_id,
      name : server_name,
      token : server_token,
      ipaddress : server_url,
      _userID : userID,
    });
    server.save(function(err){
      if(err){
        return res.status(403).send({
          success: false,
          message: 'Adding server Failed'
        });
      }
      res.send({"message":"sucess","token":server_token});
    });
  });
});

router.get('/list', function(req, res) {
  DB.Server.find().populate("_userID").exec(function(err, user){
          res.send(user);
     });
});


router.get('/getToken', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
