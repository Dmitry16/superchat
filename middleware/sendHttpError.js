module.exports = function(req, res, next) {

  // console.log('middleware:sendHttpError::::pluggedin!')

  res.sendHttpError = function(error) {

    // console.log('middleware:sendHttpError:::error.status::', error.status);
    
    // res.status(error.statusCode);
    if (res.req.headers['x-requested-with'] === 'XMLHttpRequest') {
      // console.log('middleware:sendHttpError::222')
      res.json(error);
    } else {
      // console.log('middleware:sendHttpError::message::', error.message)
      res.render('error', {error: error});
    }
  };
  next();
};