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

// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err){
       throw err;
     }

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password !== req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        if (err){ throw err; }
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, settings.secret, {
          expiresIn: 600 // expires in 24 hours
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next) {
  auth(req,
    next,
    function(){
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    });
});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/users', function(req, res) {
  DB.User.find({}, function(err, users) {
    res.json(users);
  });
});

apiRoutes.get('/check', function(req, res) {
  res.json({"data":req.decoded});
});

module.exports = apiRoutes;
