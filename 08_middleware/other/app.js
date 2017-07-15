const connect = require('connect');
const http = require('http');

const port = 3300;

const logger = (req, res, next) => {
  console.log(`Incomming request: ${req.method} - ${req.url}`);
  next();
};

const postHandler = (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    body = JSON.parse(body);

    res.end(JSON.stringify({
      body,
      headers: req.headers,
    }));
  });
};

const requestHandler = (req, res, next) => {
  if (req.method === 'POST') {
    return postHandler(req, res, next);
  }

  return next();
};

const notFound = (req, res) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 404, message: 'Not found' }));
};

const app = connect();

app.use(logger)
  .use(requestHandler)
  .use(notFound);

http.createServer(app).listen(port, 'localhost', () => {
  console.log('Server is listening on port %s', port);
});
