let nconf = require('nconf');
var path = require('path');

console.log('path::', __dirname);

nconf.argv()
  .env()
  .file({ file: path.join(__dirname, 'config.json') });

module.exports = nconf;