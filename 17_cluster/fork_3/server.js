const http = require('http');
const { fork } = require('child_process');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/calc') {
    const calc = fork('./calc.js');

    calc.send('start');
    calc.on('message', sum => res.end(`Sum: ${sum}`));

  } else {
    res.end('OK');
  }
});

server.listen(3000);
