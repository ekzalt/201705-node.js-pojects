const winston = require('winston');

/*
// добавить цвета
const ENV = process.env.NODE_ENV || 'development'; // app.get('env')
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: (ENV === 'development') ? 'debug' : 'error'
    })
  ]
});

class Logger {
  constructor(log) {
    this.logger = log;
  }

  info(msg) {
    this.logger.info(msg);
  }

  error(msg) {
    this.logger.error(msg);
  }
}

module.exports = new Logger(logger);
*/

const ENV = process.env.NODE_ENV || 'development'; // app.get('env')

const getLogger = module => {
  // const path = module.filename.split('/').slice(-2).join('/'); // nixOS path
  const path = module.filename.split('\\').slice(-2).join('/'); // winOS path

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: (ENV === 'development') ? 'debug' : 'error',
        label: path
      })
    ]
  });
};

module.exports = getLogger;
