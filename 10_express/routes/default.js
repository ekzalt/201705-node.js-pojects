const router = require('express').Router();
const codes = require('http-status-codes');

const { pathDefault } = require('../constants/routes');
const log = require('../services/logger')(module);

router.get(pathDefault, (req, res) => {
  log.info(`GET ${pathDefault}`);
  log.error('ERROR o_O');

  res.json({
    status: codes.OK,
    method:req.method,
    message: 'Index page'
  });
});

router.post(pathDefault, (req, res) => {
  res.json({
    status: codes.OK,
    method:req.method,
    body: req.body,
    message: 'Index page'
  });
});

module.exports = router;
