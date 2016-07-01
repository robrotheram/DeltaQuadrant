var jwt = require('jsonwebtoken');
var settings = require('../../settings');
var auth = function(req, success, fail){
  var token = req.body.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, settings.secret, function(err, decoded) {
        if (err) { return fail(); }
        req.decoded = decoded;
        return success();
    });
  } else {
    return fail();
  }
};
module.exports = {"auth": auth};
