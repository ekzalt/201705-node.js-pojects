const http = require('http');
// const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // let urlParse = url.parse(req.url, true);

  if (req.method === 'POST' && req.url === '/upload') {
    console.log('--- POST ---\n', req.headers);

    let body = [];

    req.on('data', chunk => body.push(chunk));

    req.on('end', () => {
      console.log('--- upload ---\n', body);
      body = body.toString('utf8').slice(0, -16);
      // body = Buffer.concat(body).toString('utf8').slice(0, -16);

      res.writeHead(200, { 'Content-type': 'text/html' });
      res.write(`${body}<h4>all rights reserved &copy;</h4>\n</body>\n</html>`);
      res.end();
    });

    req.on('error', err => {
      console.error(err);
      res.writeHead(400, { 'Content-type': 'text/plain' });
      res.end('Bad Request');
    });

  } else {
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.end('Not found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
