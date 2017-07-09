class Chain {
  constructor() {
    this.counter = 0;
  }

  addMethod(name, method) {
    if (typeof name === 'string' && typeof method === 'function') {
      this[name] = method;
    } else {
      console.error('Bad argument!');
    }
  }
}

let chain = new Chain();

chain.addMethod('plus1', function() {
  this.counter += 1;
  return this;
});

chain.addMethod('plus2', function() {
  this.counter += 2;
  return this;
});

chain.addMethod('plus3', function() {
  this.counter += 3;
  return this;
});

let num = chain.plus1().plus2().plus3().counter;
console.log(num);
