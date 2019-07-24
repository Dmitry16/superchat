var express = require('express');
var router = express.Router();
let User = require('models/user').User;
let HttpError = require('error').HttpError;

// module.exports = function(app) {
  // app.get('/', function(req, res, next) {
  //   res.render('index');
  // });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Zhuzha' });
});

router.get('/users', function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

router.get('/users/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return next(err);
    if (!user) {
      console.log('routes/index.js::!user!user!user!user!user')
      next(new HttpError(404, 'User not found! aaaa!'));
      return;
    }
    res.json(user);
  });
});

module.exports = router;
