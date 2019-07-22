let mongoose = require('libs/mongoose');
let User = require('models/user').User;

//1.drop database
//2.create and save 3 users
//3.close connection

let db = mongoose.connection;

db.on('error', function(err) {
  if (err) throw err;
})

db.once('open', function() {
  console.log('connection is opened!!!');
  db.dropDatabase(function(err) {
    if (err) throw err;
    console.log('dropDatabase::OK')

    // create 3 users
    let vasya = new User({
      username: 'Vasya',
      password: 'zzz'
    });
    let petya = new User({
      username: 'Petya',
      password: 'xxx'
    });
    let zhuzha = new User({
      username: 'Zhuzha',
      password: 'zhzh'
    });
    vasya.save(function(err, user, res) {
      if (err) throw err;
      console.log(`user ${user.username} saved`)
    });
    petya.save(function(err, user, res) {
      if (err) throw err;
      console.log(`user ${user.username} saved`)
    });
    zhuzha.save(function(err, user, res) {
      if (err) throw err;
      console.log(`user ${user.username} saved`)
      console.log('still connected::readyState::', mongoose.connection.readyState);
      mongoose.disconnect(function() {
        console.log('connection closed!!!readyState::', mongoose.connection.readyState);
      });
    });
  });
});


