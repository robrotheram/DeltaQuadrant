var users = require('../../models/users');
var settings = require('../../settings');
var DB = require('../../DB');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


/* GET users listing. */
router.post('/login', function(req, res) {
  var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  DB.User.findOne({ name: req.body.username }, function(err, user) {
    if (err){ throw err; }
    console.log(user,ip);
    if(!user){
      res.send({message:"can not find user"});
    } else if (req.body.password === user.password) {
        var tkn = jwt.sign({ userID: user._id }, settings.secret);
        res.send({"message":"sucess","token":tkn});
    } else {
        res.send({message:"Login Failed"});
    }
  });
});

router.post('/register', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
