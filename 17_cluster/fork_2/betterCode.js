// bad code

const http = require('http');

const longCalc = () => {
  let sum = 0;

  for (let i = 0; i < 1e9; i++) sum += i;

  return sum;
};

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/calc') {
    setTimeout(() => {
      let sum = longCalc();
      res.end(`Sum: ${sum}`);
    }, 0);

  } else {
    res.end('OK');
  }
});

server.listen(3000);
