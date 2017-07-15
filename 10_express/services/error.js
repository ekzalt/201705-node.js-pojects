const codes = require('http-status-codes');

const log = require('./logger')(module);

module.exports = {
  notFound: (req, res, next) => {
    log.error(`${req.url}: Not Found`);

    res.status(codes.NOT_FOUND);

    res.json({
      code: codes.NOT_FOUND,
      message: 'Not found'
    });
  },

  internal: (err, req, res, next) => {
    log.error(`${req.url}: Server error`);

    res.status(codes.INTERNAL_SERVER_ERROR);

    res.json({
      code: codes.INTERNAL_SERVER_ERROR,
      message: 'Server error'
    });

    next();
  }
};
