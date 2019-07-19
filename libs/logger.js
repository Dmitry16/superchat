let winston = require('winston');
let ENV = process.env.NODE_ENV;

let path = module.filename.split('/').slice(-2).join('/');

let logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: ENV === 'development' ? 'debug' : 'error',
      label: path
    })
  ]
});

logger.info('Hello again distributed logs');

function getLogger(module) {

  let path = module.filename.split('/').slice(-2).join('/');

  // console.log('getLogger::module::', module);

  // console.log('zxzxzx:::', module.filename.split('/').slice(-2).join('/'));

  // return new (winston.Logger)({
    // transports: [
    //   new winston.transports.Console({
    //     colorize: true,
    //     level: ENV === 'development' ? 'debug' : 'error',
    //     label: path
    //   })
    // ]
  // });
}

module.exports = getLogger;