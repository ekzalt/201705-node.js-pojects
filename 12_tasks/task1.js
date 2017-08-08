/*
Задания:

1a - Последовательное выполнение колбеков. Создать 'callback Hell'
1b - Параллельное выполнение колбеков

2a - Последовательное выполнение промисов
2b - Параллельное выполнение промисов
*/

// const fakeHttp = (url, callback) => {};

let resultsCallback = [];

// --- 1a ---

/*
const waitCallback = (ms, msg, callback) => {
  setTimeout(() => {
    resultsCallback.push(msg);
    console.log(msg);
    callback();
  }, ms);
};

waitCallback(2000, 'done1', () => {
  waitCallback(2000, 'done2', () => {
    waitCallback(2000, 'done3', () => {
      console.log(resultsCallback);
    });
  });
});
*/

// --- 1b ---

const parallelCallbacks = cbsArr => {
  for (cb of cbsArr) {
    cb();
  }
  console.log('call all!');
};

let callbacks = [
  function() {
    setTimeout(() => {
      resultsCallback.push('3000');
      console.log(resultsCallback);
    }, 3000);
  },
  function() {
    setTimeout(() => {
      resultsCallback.push('1000');
      console.log(resultsCallback);
    }, 1000);
  },
  function() {
    setTimeout(() => {
      resultsCallback.push('2000');
      console.log(resultsCallback);
    }, 2000);
  }
];

parallelCallbacks(callbacks);

////////////////////////////////////////////////

let resultsPromise = [];

// --- 2a ---

const waitPromise = (ms, msg) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      resultsPromise.push(msg);
      console.log(msg);
      res(msg);
    }, ms);
  });
};

/*
waitPromise(1000, 'hello1')
  .then(msg => waitPromise(1000, msg))
  .then(msg => waitPromise(1000, msg))
  .then(() => console.log(JSON.stringify(resultsPromise)))
  .catch(err => console.error(err));
*/

// --- 2b ---

/*
Promise.all([
  waitPromise(3000, '3000'),
  waitPromise(1000, '1000'),
  waitPromise(2000, '2000')
  ])
  .then(() => console.log(JSON.stringify(resultsPromise)))
  .catch(err => console.error(err));
*/
