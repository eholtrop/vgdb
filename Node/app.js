var express       = require('express');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var bcrypt        = require('bcrypt-nodejs');
var ejs           = require('ejs');
var path          = require('path');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var flash         = require('connect-flash');
var promise       = require('bluebird');
var app = express();



var routes        = require('./routes/index');
var users         = require('./routes/user');
var games         = require('./routes/api/games');
var consoles      = require('./routes/api/consoles');
var regions       = require('./routes/api/regions');
var release_dates = require('./routes/api/release_dates');
var wikipedia     = require('./routes/wikipediaParse/wikipedia');




passport.use(new LocalStrategy(function(username, password, done) {
  new Model.User({username: username}).fetch().then(function(data) {
    var user = data;
    if(user === null) {
      return done(null, false, {message: 'Invalid username or password'});
    } else {
      user = data.toJSON();
      if(!bcrypt.compareSync(password, user.password)) {
        return done(null, false, {message: 'Invalid username or password'});
      } else {
        return done(null, user);
      }
    }
  });
}));

passport.use(new LocalStrategy(function(username, password, done) {
  new Model.User({username: username}).fetch().then(function(data) {
    var user = data;
    if(user === null) {
      return done(null, false, {message: 'Invalid username or password'});
    } else {
      user = data.toJSON();
      if(!bcrypt.compareSync(password, user.password)) {
        return done(null, false, {message: 'Invalid username or password'});
      } else {
        return done(null, user);
      }
    }
  });
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'vgdb' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require('./routes/user.js')(app, passport);
app.use('/', routes);
app.use('/login', users);
app.use('/signup', users);
app.use('/profile', users);
app.use('/logout', users);
app.use('/', games);
app.use('/', release_dates);
app.use('/consoles', consoles);
app.use('/regions', regions);
app.use('/wikipediaParse', wikipedia);

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
