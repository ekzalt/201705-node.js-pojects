const http = require('http');
const connect = require('connect');
const app = connect();

const hostname = '127.0.0.1';
const port = 3000;

const logger = (req, res, next) => {
  console.log('req.url:\n', req.url);
  next();
};

const notFound = (req, res, next) => {
  res.writeHead(404, { 'Content-type': 'text/plain' });
  res.end('404 - Not found');
  next();
};

const greet = (req, res) => {
  res.writeHead(200, { 'Content-type': 'application/json' });
  res.end(JSON.stringify({code: 200, message: 'Hello'}));
  next();
};

const server = http.createServer(app);

app.use(logger);
app.use('/hello', greet);
app.use(notFound);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// error handing - function(err, req, res, next) {...}
