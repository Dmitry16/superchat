let mongoose = require('libs/mongoose');
let User = require('models/user').User;

//1.drop database
//2.create and save 3 users
//3.close connection
fireStarter();

async function fireStarter() {
  await dropDB();
  createUsers();
}
function dropDB() {
  let db = mongoose.connection;
  db.once('open', function() {
    console.log('connection is opened!!!');
    db.dropDatabase(function(err) {
      if (err) throw err;
      console.log('dropDatabase::OK')
      return true;
    });
  });
};
function createUsers() {
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
  });
};
function disconnectMongoose() {
  mongoose.disconnect(function() {
    console.log('connection closed!!!readyState::', mongoose.connection.readyState);
  });
};


