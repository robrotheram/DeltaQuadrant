var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/api/users');
var servers = require('./routes/api/servers');
var apiRoutes = require('./routes/api/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', apiRoutes);
app.use('/auth', users);
app.use('/server', servers);

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/beta', function(req, res, next) {
  var ud = uuid.v4();
  res.send({"uuid":ud});
});


app.get('/setup', function(req, res) {

  // create a sample user
  var nick = new User({
    name: 'Nick Cerminara',
    password: 'password',
    admin: true
  });
  nick.save(function(err) {
    if (err) {
      throw err;
    }
    console.log('User saved successfully');
    res.json({ success: true });
  });
});
app.get('/setupserver', function(req, res) {

  // create a sample user
  var ser = new Server({
    name: "test_server",
    ipaddress: "127.0.0.1",
    authPublic: "public",
    authSecret: "secret",
  });
  ser.save(function(err) {
    if (err){
      throw err;
    }
    console.log('Server saved successfully');
    res.json({ success: true });
  });
});



app.post('/server', function(req, res) {
  console.log(req.body);
  var coll = db.collection('logs');
  coll.insertOne(req.body);
  res.json(req.body);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

module.exports = app;
