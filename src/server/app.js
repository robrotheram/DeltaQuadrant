var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var uuid = require('node-uuid');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var User   = require('./models/users'); // get our mongoose model
var Server   = require('./models/servers'); // get our mongoose model
var routes = require('./routes/index');

var login = require('./routes/users/index');
var apiRoutes = require('./routes/api/index');
var settings  = require('./settings');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('superSecret', 'bob'); // secret variable
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(settings.logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: new MongoStore({ mongooseConnection: settings.mongoose.connection }),
  secret: '1234567890QWERTY',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', apiRoutes);
app.use('/login', login);

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
