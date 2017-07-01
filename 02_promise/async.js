const wait = (ms, msg) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log(msg);
      res('done');
    }, ms);
  });
};

wait(1000, 'hello')
  .then(() => wait(1000, 'hello2'))
  .then(() => wait(1000, 'hello3'))
  .then((data) => console.log(data));