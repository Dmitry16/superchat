let User = require('models/user').User;

let username = 'toster';

User.find({}, function(err, res) {

  if (res.length) {
    username += res.length;
  }
  
  let user = new User({
    username,
    password: 'tost'
  });
  
  console.log('find:res::', user);
  
  user.save(function(err, user, affected) {
    if (err) throw err;
  });
});
