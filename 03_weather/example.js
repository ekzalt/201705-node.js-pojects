/*
setTimeout(() => console.log('setTimeout1'), 100);

console.log('wait');

setImmediate(() => console.log('setImmediate'));

process.nextTick(() => console.log('nextTick'));

setTimeout(() => console.log('setTimeout2'), 200);
*/

/*
setTimeout(() => {
  console.log('1s');

  setTimeout(() => {
    console.log('2s');

    setTimeout(() => {
      console.log('3s');

      setTimeout(() => {
        console.log('done');
      }, 0);
    }, 3000);
  }, 2000);
}, 1000);
*/

/*
const setTimePeriod = (ms, msg) => {
  return new Promise((resolve, reject) => {
    if (ms >= 10000) reject('too much ms :(');

    setTimeout(() => {
        resolve(msg);
      }, ms);
    
  });
};

setTimePeriod(1000, '1s')
  .then(done => {
    console.log(done);
    return setTimePeriod(2000, '2s');
  })
  .then(done => {
    console.log(done);
    return setTimePeriod(3000, '3s');
  })
  .then(done => {
    console.log(done);
    // return setTimePeriod(11000, '11s');
    return setTimePeriod(4000, '4s');
  })
  .then(done => {
    console.log(done);
    console.log('done');
  })
  .catch(err => {
    console.log(err);
    console.log('err');
  });
*/

/*
setTimeout(() => {
  console.log('1s');
}, 1000);

setTimeout(() => {
  console.log('2s');
}, 2000);

setTimeout(() => {
  console.log('3s');
}, 3000);
*/

const wait = (ms, msg) => {
  return new Promise((res, rej) => {
    if (ms > 2000) {
      rej('too much ms');
      return;
    }

    setTimeout(() => {
      console.log(msg);
      res(ms);
    }, ms);
  });
};

/*
Promise.all([
  wait(2000),
  wait(1000),
  wait(500)
])
  .then(done => {
    console.log(done);
    console.log('done');
  })
  .catch(err => {
    console.log(err);
    console.log('err');
  });
*/

/*
Promise.race([
  wait(2000),
  wait(1000),
  wait(500)
])
  .then(done => {
    console.log(done);
    console.log('done');
  })
  .catch(err => {
    console.log(err);
    console.log('err');
  });
*/

/*
Promise.resolve('data')
  .then(data => {
    console.log(data);
  });
*/

/*
Promise.reject('error')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log('err');
    console.log(err);
  });
*/
