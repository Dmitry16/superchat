console.log('NODE_ENV:::', process.env.NODE_ENV);

let config = require('config');
var express = require('express');
var createError = require('http-errors');
let http = require('http');
var path = require('path');
let log = require('libs/logger')(module);

// in command line: node app -q w
// console.log('argv::q:', config.get('q'));

var app = express();
app.set('port', config.get('port'));

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + config.get('port'));
});
// Middlewares
app.use(function(req, res, next) {
  if (req.url === '/') {
    res.end('Hello!');
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  if (req.url === '/test') {
    res.end('TEST!');
  } else {
    next();
  }
});

// app.use(function(req, res) {
//   res.status(404).send('Page not found! :(');
// });

// app.use(function(req, res, next) {
//   if (req.url === '/forbidden') {
//     next(new Error('aaaaaaaaaaa'));
//   } else {
//     next();
//   }
// });

// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.messag = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error2');
});

// app.use(function(err, req, res, next) {
//   if (app.get('env') === 'development') {
//     res.end('ERRRRORRRR!!!');
//   } else {
//     res.end('goodby!');
//   }
// });


module.exports = app;
