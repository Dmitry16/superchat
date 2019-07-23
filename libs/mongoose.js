let mongoose = require('mongoose');
let config = require('config');

console.log('libs/mongoose');

mongoose.connect(config.get('mongoose:uri'), { useNewUrlParser: true }, config.get('mongoose:options'));

module.exports = mongoose;