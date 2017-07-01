const EventEmitter = require('events').EventEmitter;
const fs = require('fs');
const path = require('path');
const encoding = 'utf8'; // { encoding: 'utf8' }

class FSEventEmitter extends EventEmitter {
  constructor() {
    super();
  }

  accessFile(pathFile) {
    // наличие файла
    fs.access(path.join(__dirname, pathFile), (err) => {
      if (err) return console.error(`accessFile ${pathFile} error:\n`, err);

      // console.log('accessFile OK:', pathFile);
      this.emit('accessFile', pathFile);
    });
  }

  readFile(pathFile) {
    /*
    // чтение файла - вариант 1
    fs.readFile(path.join(__dirname, pathFile), encoding, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') return console.error(`readFile ${pathFile} error - Not Found:\n`, err.message);
        else return console.error(`readFile ${pathFile} error:\n`, err);
      }

      // console.log(`readFile ${pathFile} OK:`, data);
      // console.log(data.toString('utf8'));
      // data[0];
      // data.length;
      this.emit('readFile', pathFile, data);
    });
    */

    // чтение файла - вариант 2
    let data = '';
    let stream = fs.createReadStream(path.join(__dirname, pathFile));

    stream.on('readable', () => {
      data += stream.read();
    });

    stream.on('close', () => {
      data = data.slice(0, -4);
      this.emit('readFile', pathFile, data);
      stream.destroy();
    });

    stream.on('error', (err) => {
      if (err.code === 'ENOENT') return console.error(`readFile ${pathFile} error - Not Found:\n`, err.message);
      else return console.error(`readFile ${pathFile} error:\n`, err);
    });
  }

  writeFile(pathFile, data) {
    /*
    // запись файла (если файла нет - он будет создан) - вариант 1
    fs.writeFile(path.join(__dirname, pathFile), data, encoding, (err) => {
      if (err) return console.error(`writeFile ${pathFile} error:\n`, err);

      // console.log('writeFile OK:', pathFile, data);
      this.emit('writeFile', pathFile, data);
    });
    */

    // запись файла - вариант 2
    let stream = fs.createWriteStream(path.join(__dirname, pathFile));

    stream.on('open', () => {
      stream.write(data);
      stream.end();
    });

    stream.on('close', () => {
      this.emit('writeFile', pathFile, data);
      stream.destroy();
    });

    stream.on('error', (err) => console.error(`writeFile ${pathFile} error:\n`, err));
  }

  renameFile(oldPath, newPath) {
    // переименование файла
    fs.rename(path.join(__dirname, oldPath), path.join(__dirname, newPath), (err) => {
      if (err) return console.error(`renameFile ${oldPath} to ${newPath} error:\n`, err);

      // console.log('renameFile OK:', newPath);
      this.emit('renameFile', newPath);
    });
  }

  copyFile(oldPath, newPath) {
    let stream = fs.createReadStream(path.join(__dirname, oldPath));

    stream.pipe(fs.createWriteStream(path.join(__dirname, newPath)));

    stream.on('close', () => {
      this.emit('copyFile', newPath);
      stream.destroy();
    });

    stream.on('error', (err) => console.error(`copyFile ${oldPath} to ${newPath} error:\n`, err));
  }

  deleteFile(pathFile) {
    // удаление файла
    fs.unlink(path.join(__dirname, pathFile), (err) => {
      if (err) return console.error(`deleteFile ${pathFile} error:\n`, err);

      // console.log('deleteFile OK:', pathFile);
      this.emit('deleteFile', pathFile);
    });
  }
}

let fsee = new FSEventEmitter();

fsee.on('accessFile', pathFile => console.log('--- accessFile OK ---\n', pathFile));
fsee.on('readFile', (pathFile, data) => console.log(`--- readFile ${pathFile} OK ---\n`, data));
fsee.on('writeFile', (pathFile, data) => console.log(`--- writeFile ${pathFile} OK ---\n`, data));
fsee.on('renameFile', newPath => console.log(`--- renameFile OK ---\n`, newPath));
fsee.on('copyFile', newPath => console.log(`--- copyFile OK ---\n`, newPath));
fsee.on('deleteFile', pathFile => console.log(`--- deleteFile OK ---\n`, pathFile));

const steps = async () => {
  await fsee.accessFile('lorem.txt');
  await fsee.readFile('lorem.txt');
  await fsee.writeFile('old.txt', '1234567890');
  await fsee.renameFile('old.txt', 'new.txt');
  await fsee.copyFile('new.txt', 'newCopy.txt');
  await fsee.deleteFile('new.txt');
};

steps();
