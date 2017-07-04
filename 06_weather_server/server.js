/*
1. Написать клиента который будет получать данные с сервера погоды,
записывать их в объект и этот объект выводить на консоль.

2. Написать сервер, который по реквесту будет вызывать этого клиента.
*/

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
const encoding = 'utf8';

const server = http.createServer((req, res) => {
  let urlParse = url.parse(req.url, true);
  // console.log(urlParse);

  if (req.method === 'GET' && urlParse.path.match(/\.(html|css|js|png)$/)) {
    const extension = path.extname(urlParse.path); // /css/style.css -> .css
    const filename = urlParse.path.slice(1); // /css/style.css -> css/style.css
    let contentType = '';

    console.log('--- GET ---', filename);

    switch (extension) {
      case '.html':
        contentType = 'text/html';
        break;

      case '.css':
        contentType = 'text/css';
        break;

      case '.js':
        contentType = 'text/javascript';
        break;

      case '.png':
        contentType = 'image/png';
        break;

      default:
        contentType = 'text/plain';
    }

    res.statusCode = 200;
    res.setHeader('Content-type', contentType);

    // const stream = fs.createReadStream( path.join(__dirname, '..', 'public', req.url) );
    const stream = fs.createReadStream(path.resolve('public', filename));
    stream.pipe(res);

    stream.on('error', err => {
      if (err.code === 'ENOENT') {
        console.error(`readFile ${filename} error - Not Found:\n`, err.message);
        res.writeHead(404, { 'Content-type': 'text/plain' });
        res.end('Not found');
        return;

      } else {
        console.error(`readFile ${filename} error:\n`, err);
        res.writeHead(500, { 'Content-type': 'text/plain' });
        res.end('Server error');
        return;
      }
    });

  } else if (req.method === 'GET' && urlParse.path === '/') {
    console.log('--- GET ---', 'index.html');
    /*
    fs.readFile(path.join(`${__dirname}/public`, 'index.html'), encoding, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') console.error(`readFile index.html error - Not Found:\n`, err.message);
        else console.error(`readFile index.html error:\n`, err);

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('500\nServer Error');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
    */

    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');

    // const stream = fs.createReadStream( path.join(__dirname, '..', 'public', req.url) );
    const stream = fs.createReadStream(path.resolve('public', 'index.html'));
    stream.pipe(res);

    stream.on('error', err => {
      if (err.code === 'ENOENT') {
        console.error(`readFile index.html error - Not Found:\n`, err.message);
        res.writeHead(404, { 'Content-type': 'text/plain' });
        res.end('Not found');
        return;

      } else {
        console.error(`readFile index.html error:\n`, err);
        res.writeHead(500, { 'Content-type': 'text/plain' });
        res.end('Server error');
        return;
      }
    });

  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
