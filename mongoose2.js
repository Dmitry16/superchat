let mongoose = require('libs/mongoose');
let User = require('models/user').User;

// 1.open connection
// 2.drop database
// 3.create and save 3 users
// 4.close connection

let arrUsers = [
  {
    username: 'Vasya',
    password: 'zzz'
  },
  {
    username: 'Petya',
    password: 'zzz'
  },
  {
    username: 'Zhuzha',
    password: 'zzz'
  },
];

run();

async function run() {
  try {
    let db = await openConnection();
    await dropDB(db);
    console.log('created Users::', await createUsers(arrUsers));
    closeConnection();
  } catch (err) {
    console.log('ERRRRORRR::', err);
  }
}

function createUsers(arrUsers) {
  let createdUsers = arrUsers.map(user => new User({
    username: user.username,
    password: user.password
  }));
  // console.log('createdUsers::', createdUsers);
  return Promise.all(createdUsers.map(user => user.save()));
};

function callback(err, res) {
  if (err) {
    console.log('ZZZZZZZZZZZ::', err);
    return;
  }
  console.log('resresresresres:::', res);
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

function closeConnection() {
  mongoose.disconnect(function() {
    console.log('connection closed!!!readyState::', mongoose.connection.readyState);
  });
};


// vasya.save(function(err, user, res) {
//   if (err) throw err;
//   console.log(`user ${user.username} saved`)
// });
// petya.save(function(err, user, res) {
//   if (err) throw err;
//   console.log(`user ${user.username} saved`)
// });
// zhuzha.save(function(err, user, res) {
//   if (err) throw err;
//   console.log(`user ${user.username} saved`)
//   console.log('connection status::readyState::', mongoose.connection.readyState);
//   resolve();
// });