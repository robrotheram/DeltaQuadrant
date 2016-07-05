var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var kafka = require('kafka-node');

var routes = require('./routes/index');
var users = require('./routes/api/users');
var servers = require('./routes/api/servers');
var apiRoutes = require('./routes/api/index');

var app = express();


var Producer = kafka.Producer;
var client = new kafka.Client('172.17.0.2:2181');
var producer = new Producer(client);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/ingestion', apiRoutes);
app.use('/api/users', users);
app.use('/api/server', servers);

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/beta', function(req, res, next) {

  var payloads = [
          { topic: 'test', messages: 'hi', partition: 0 },
      ];
  //console.log(payloads);
  producer.on('ready', function () {
      producer.send(payloads, function (err, data) {
          console.log(err,data);
      });
  });

  producer.on('error', function (err) {console.log("ERR",err);});




  res.send({"uuid":"stuff"});
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
