module.exports = {
  increment(num, step = 1) {
    if (typeof num !== 'number' || typeof step !== 'number') {
      throw new Error('Wrong type of input element');
    }

    return num >= 10 ? 10 : num + step;
    // return num + step;
  },

  decrement(num, step = 1) {
    if (typeof num !== 'number' || typeof step !== 'number') {
      throw new Error('Wrong type of input element');
    }

    return num <= 0 ? 0 : num - step;
    // return num + step;
  },

  asyncIncrement(num, step, cb) {
    setTimeout(() => {
      cb(num + step);
    }, 500);
  },

  asyncDecrement(num, step = 1) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(num - step);
      }, 500);
    });
  }
};
