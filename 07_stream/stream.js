// event: start || data, end

// type: readable, writable, duplex

const http = require('http');
// const url = require('url');
// const path = require('path');
// const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
// const encoding = 'utf8';

const server = http.createServer((req, res) => {
  /*
  console.log(res.eventNames());
  console.log(res.listeners('data'));

  res.writeHead(200, { 'Content-type': 'application/json' });
  res.write('hello 1\n');
  res.write('hello 2\n');

  // res.eventNames()
  // res.listeners(arg)
  console.log(res.eventNames());

  res.on('finish', () => {
    console.log('finish');
  });

  res.end('bye\n');
  */

  ////////////////////////////////////////////

  /*
  let reqData = [];

  req.on('data', chunk => reqData.push(chunk));
  req.on('end', () => {
    res.write(reqData.join(''));
    res.end();
  });
  */

  ////////////////////////////////////////////

  /*
  req.on('data', chunk => res.write(chunk));
  req.on('end', () => res.end());
  */

  ////////////////////////////////////////////

  res.writeHead(200, { 'Content-type': 'application/json' });
  req.pipe(res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
