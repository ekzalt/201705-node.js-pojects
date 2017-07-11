// nodemon - переподнимает express
const http = require('http');
const url = require('url');
const path = require('path');
const express = require('express');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

////////////////////////////////////////////////////////////

const logger = (req, res, next) => {
  console.log(`------ ${req.method} - ${req.url} ------`);
  console.log('------ headers ------\n', req.headers);
  next();
};

////////////////////////////////////////////////////////////

// logger
app.use(logger);

// routers
app.get('/home', (req, res) => {
  res.status(200);
  res.json({code: 200, message: 'Home'});
});

app.use((req, res, next) => {
  res.status(404);
  res.json({code: 404, message: 'Not found'});
});

////////////////////////////////////////////////////////////

http.createServer(app).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
