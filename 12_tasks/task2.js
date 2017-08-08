// Задание: промисифицироваь нативную "колбекную" функцию

const fs = require('fs');

const readFileAsync = path => {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      return err ? rej(err) : res(data);
    });
  });
};

/*
function nexTick() {
  return new Promise((res, rej) => {
    //
  });
}
*/
