const fs = require('fs');

// let file = fs.createReadStream(someFile);
// let newFile = fs.createWriteStream(file);

/*
let fileData = fs.readFile('./lorem.txt', (err, data) => {
  console.log(data.toString());
});
*/

let i = 0;
let fileDataStream = fs.createReadStream('./lorem.txt');

fileDataStream.on('data', chunk => {
  i++;
  console.log(chunk.toString('utf8'));
});
fileDataStream.on('end', () => {
  console.log(1);
  console.log('end');
});

let writeStream = fs.createWriteStream('./copy.txt');
fileDataStream.pipe(writeStream);
