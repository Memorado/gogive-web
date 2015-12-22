var fs = require('fs');
var join = require('path').join;
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var mongoose = require('mongoose');
var flash = require('connect-flash');

var dbURI = process.env.MONGO_URL
if (dbURI == null) {
  dbURI = "mongodb://gogive:81fa774ec04f3a5ea3b6df6b1ab4a431@carlossless.io:17196/gogive"
}

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(dbURI, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(join(__dirname, 'models')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(__dirname, 'models', file));
});

var User = mongoose.model('User');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ _id: id }, function(err, user) {
    done(null, user);
  });
});

var index = require('./routes/index');
var center_index = require('./routes/center/index');
var api_center = require('./routes/api/center');
var admin_center = require('./routes/admin/center');
var admin_user = require('./routes/admin/user');

app.use('/', index);
app.use('/center', center_index);
app.use('/api/center', api_center);
app.use('/admin/center', admin_center);
app.use('/admin/user', admin_user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('admin/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('admin/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
