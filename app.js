var createError = require('http-errors');
let HttpError = require('error').HttpError;
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session');
let config = require('config');
let mongoose = require('libs/mongoose');
let MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// console.log('mongoose.connection:::', mongoose.connection);
app.use(session({
  secret: config.get('session:secret'),
  resave: config.get('session:resave'),
  saveUninitialized: config.get('session:saveUninitialized'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(function(req, res, next) {
  req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
  res.send(`Number of visits: ${req.session.numberOfVisits}`);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(require('middleware/sendHttpError'));
// error handler
app.use(function(err, req, res, next) {
  // console.log('app.js::error handler::errrrrrrrrr')
  if (typeof err === 'number') {
    // console.log('app.js:::typeof err === number')
    err = new HttpError(err);
  }
  if (err instanceof HttpError) {
    // console.log('app.js:::err instanceof HttpError')
    res.sendHttpError(err);
  } else {
    // console.log('kuku from errorHandler!!!!!!!!!!!!!!');
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    // res.status(err.status || 500);
    // res.render('error');
  }
});

module.exports = app;
