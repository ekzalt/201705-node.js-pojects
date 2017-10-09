const { Server } = require('http');
const domain = require('domain').create();

const server = new Server((req, res) => {
  req.oops.oops = 'oops';
  // req.emit('error', 'ERROR_FROM_REQ');
  throw new Error('MY_ERROR');
});

/*
server.on('error', err => {
  console.log('SERVER_LOG_ERROR', err.message);
  process.exit(1);
});

process.on('uncaughtException', err => {
  console.log('PROCESS_LOG_ERROR', err.message);
  process.exit(1);
});
*/

domain.on('error', err => {
  console.log('DOMAIN_LOG_ERROR', err.message);
  process.exit(1);
});

domain.run(() => {
  const server = new Server((req, res) => {
    // req.oops.oops = 'oops';
    req.emit('error', 'ERROR_FROM_REQ');
    throw new Error('MY_ERROR');
  });
});

server.listen(3000, 'localhost', () => {
  console.log('http://localhost:3000')
});

console.log(server.eventNames());
