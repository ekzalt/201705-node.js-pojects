// task 1
// 1 => 2 => 3 => 4 => 5 = ??

const addNum = n => {
  return new Promise((resolve, reject) => {
    if (isNaN(n)) throw new Error('NaN in args!');

    if (!addNum.sum) addNum.sum = n;
    else addNum.sum += n;

    console.log(addNum.sum);
    resolve(addNum.sum);
  });
};

addNum(1)
.then( addNum(2) )
.then( addNum(3) )
.then( addNum(4) )
.then( addNum(5) )
.catch(err => console.log(err.message));

/////////////////////////////////////////////////

// task 2
// 6 сеттаймаутов последовательно с рандомными задержками

const randDelay = () => {
  return Math.round(Math.random() * 10000);
};
// console.log(randDelay());

const wait = ms => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`delay: ${ms}`);
      resolve('done');
    }, ms);
  });
};

/*
wait(randDelay())
  .then( () => wait(randDelay()) )
  .then( () => wait(randDelay()) )
  .then( () => wait(randDelay()) )
  .then( () => wait(randDelay()) )
  .then( () => wait(randDelay()) )
  .catch(err => console.log(err.message));
*/

///////////////////////////////////////////////

// task 3
// 6 сеттаймаутов параллельными с рандомными задержками

/*
// вариант 1
wait(randDelay())
  .then( wait(randDelay()) )
  .then( wait(randDelay()) )
  .then( wait(randDelay()) )
  .then( wait(randDelay()) )
  .then( wait(randDelay()) )
  .catch(err => console.log(err.message));
*/

// вариант 2
Promise.all([
  wait(randDelay()),
  wait(randDelay()),
  wait(randDelay()),
  wait(randDelay()),
  wait(randDelay()),
  wait(randDelay())
]).catch(err => console.log(err.message));