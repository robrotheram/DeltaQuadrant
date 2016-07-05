var users = require('../../models/users');
var settings = require('../../settings');
var DB = require('../../DB');
var auth = require('../auth').auth;
var express = require('express');
var jwt = require('jsonwebtoken');

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

module.exports = apiRoutes;
