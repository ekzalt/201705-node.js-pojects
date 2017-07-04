const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  let urlParse = url.parse(req.url, true);

  if (req.method === 'POST' && urlParse.path === '/upload') {
    console.log('--- POST ---\n', req.headers);

    res.writeHead(200, { 'Content-type': 'text/html' });

    let reqData = [];

    req.on('data', chunk => reqData.push(chunk));
    
    req.on('end', () => {
      console.log('--- upload ---\n', reqData);

      reqData = reqData.toString('utf8').slice(0, -16);
      res.write(`${reqData}<h4>all rights reserved &copy;</h4>\n</body>\n</html>`);
      res.end();
    });

  } else {
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.end('Not found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
