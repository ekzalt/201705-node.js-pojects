const http = require('http');
const connect = require('connect');
const app = connect();

const hostname = '127.0.0.1';
const port = 3000;

////////////////////////////////////////////////////////////

const logger = (req, res, next) => {
  console.log('--- req.method ---\n', req.method);
  console.log('--- req.url ---\n', req.url);
  console.log('--- req.headers ---\n', req.headers);
  console.log('--- req.headers.cookie ---\n', req.headers.cookie);

  next();
};

const getCookies = (req, res, next) => {
  if (!req.headers.cookie) next();

  let cookies = {};

  req.headers.cookie.split(';').forEach(cookie => {
    let parts = cookie.trim().split('=');

    cookies[parts[0]] = parts[1];
  });
  req.headers.cookieParsed = cookies;

  next();
};

const onError = (err, req, res, next) => {
  if (err) console.error(err);

  res.writeHead(500, { 'Content-type': 'text/plain' });
  res.end('500 - Server error');
};

const notFound = (req, res, next) => {
  res.writeHead(404, { 'Content-type': 'text/plain' });
  res.end('404 - Not found');

  next();
};

const index = (req, res, next) => {
  let cookies = req.headers.cookieParsed;

  if (req.method === 'GET') {
    res.writeHead(200, {
      'Content-type': 'application/json',
      'Set-Cookie': ['mycookie=test', 'mycookie2=test2']
    });

    res.end(JSON.stringify({ cookies }));

  } else if (req.method === 'POST') {
    let body = [];

    req.on('data', chunk => body.push(chunk));

    req.on('end', () => {
      console.log('--- upload ---\n', body);
      body = body.toString('utf8');
      console.log('--- body ---\n', body);

      res.writeHead(200, { 'Content-type': 'text/plain' });
      res.end(JSON.stringify({ cookies, body }));
    });

  } else {
    res.writeHead(400, { 'Content-type': 'text/plain' });
    res.end('Bad Request');
  }
};

////////////////////////////////////////////////////////////

const server = http.createServer(app);

// logger
app.use(logger);

// cookies
app.use(getCookies);

// routers
app.use('/', index);
app.use(notFound);

// errors
app.use(onError);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
