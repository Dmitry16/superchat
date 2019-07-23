let mongoose = require('libs/mongoose');
let User = require('models/user').User;

// 1.open connection
// 2.drop database
// 3.create and save 3 users
// 4.close connection

run();

async function run() {
  try {
    let db = await openConnection();
    await dropDB(db);
    await createUsers();
    closeConnection();
  } catch (err) {
    console.log('ERRRRORRR::', err);
  }
}

function openConnection() {
  let db = mongoose.connection;
  return new Promise( (resolve, reject) => {
    db.once('open', function(err) {
      console.log(`connection opened!!! connection status: readyState === ${mongoose.connection.readyState}`);
      resolve(db);
    });
  });
};

function dropDB(db) {
  return new Promise( resolve => {
    db.dropDatabase(function(err) {
      if (err) throw err;
      console.log(`dropDatabase::OK, connection status::readyState === ${mongoose.connection.readyState}`);
      resolve();
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
  return new Promise( resolve => {
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
      console.log('connection status::readyState::', mongoose.connection.readyState);
      resolve();
    });
  });
};

function closeConnection() {
  mongoose.disconnect(function() {
    console.log('connection closed!!!readyState::', mongoose.connection.readyState);
  });
};


