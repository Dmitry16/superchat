let crypto = require('crypto');

let mongoose = require('libs/mongoose'),
  Schema = mongoose.Schema;

// mongoose.set('debug', true);

let schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password)
  })
  .get(function() {
    return this._plainPassword;
  });

schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
}

exports.User = mongoose.model('User', schema);
