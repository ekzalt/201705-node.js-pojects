const http = require('http');

const app = require('../app');
const config = require('../config');

const server = http.createServer(app);

server.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}/`);
});
