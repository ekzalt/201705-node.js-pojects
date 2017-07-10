const http = require('http');
const url = require('url');
const connect = require('connect');
const app = connect();

const hostname = '127.0.0.1';
const port = 3000;

////////////////////////////////////////////////////////////

const logger = (req, res, next) => {
  console.log(`------ ${req.method} ${req.url} ------`);
  console.log('------ headers ------\n', req.headers);

  next();
};

const parseUrl = (req, res, next) => {
  req.urlParsed = url.parse(req.url, true);

  next();
};

const parseCookie = (req, res, next) => {
  if (!req.headers.cookie) next();

  let cookies = {};

  req.headers.cookie.split(';').forEach(cookie => {
    let parts = cookie.trim().split('=');

    cookies[parts[0]] = parts[1];
  });
  req.headers.cookieParsed = cookies;

  next();
};

const parseBody = (req, res, next) => {
  let body = [];

  req.on('data', chunk => body.push(chunk));

  req.on('end', () => {
    body = body.toString();
    req.bodyParsed = body;
    next();
  });

  req.on('error', err => {
    next(err);
  });
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
  let url = req.urlParsed;
  if (url.pathname !== '/') next();
  
  let cookies = req.headers.cookieParsed || null;
  let body = req.bodyParsed || null;
  console.log('------ body ------\n', body);

  if (req.method === 'GET') {
    res.writeHead(200, {
      'Content-type': 'application/json',
      'Set-Cookie': ['mycookie=test', 'mycookie2=test2']
    });
    res.end(JSON.stringify({ url, cookies, body }));

  } else if (req.method === 'POST') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ url, cookies, body }));

  } else {
    res.writeHead(400, { 'Content-type': 'text/plain' });
    res.end('Bad Request');
  }
};

////////////////////////////////////////////////////////////

const server = http.createServer(app);

// logger
app.use(logger);
// url
app.use(parseUrl);
// cookies
app.use(parseCookie);
// body
app.use(parseBody);
// routers
app.use('/', index);
app.use(notFound);
// errors
app.use(onError);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
