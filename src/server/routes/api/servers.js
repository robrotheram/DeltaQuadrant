var users = require('../../models/users');
var settings = require('../../settings');
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
  res.send('todo');
});
router.get('/list', function(req, res) {
  res.send('todo');
});


router.get('/getToken', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
