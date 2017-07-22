const http = require('http');

const server = http.createServer((req, res) => {

  req.on('data', chunk => {
    console.log('data');
    res.write(chunk);
  });

  req.on('end', () => {
    console.log('end');
    res.end();
  });

  req.on('error', err => {
    console.error(err);
  });

  // req.pipe(res);
});

server.listen(3000, 'localhost', () => {
  console.log('Server running at http://localhost:3000/');
});
