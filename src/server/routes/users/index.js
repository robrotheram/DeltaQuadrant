var users = require('../../models/users');
var settings = require('../../settings');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/auth', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
