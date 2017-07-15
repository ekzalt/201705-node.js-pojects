const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { pathDefault } = require('./constants/routes');
const { pageDefault } = require('./routes');
const serviceError = require('./services/error');

const app = express();

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('default'));
}

// app.use(bodyParser);
// заменить устаревший боди-парсер
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(pathDefault, pageDefault);

app.use(serviceError.notFound);
app.use(serviceError.internal);

module.exports = app;
