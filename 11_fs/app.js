const http = require('http');

const server = http.createServer((req, res) => {
  let arr = [];

  req.on('data', chunk => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    const goodBuffer = res.write(chunk);
    if (!goodBuffer) {
      req.pause();
    }
  });

  req.on('drain', () => {
    req.resume();
  });

  req.on('end', () => {
    res.end();
  })
});

server.listen(3000, () => {
  console.log('Server sterted')
});
