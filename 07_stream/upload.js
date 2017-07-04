const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  let newFile = fs.createWriteStream('megafile.txt');
  let fileBytes = req.headers['content-length'];

  req.pipe(newFile);

  req.on('end', () => {
    res.end('upload');
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
