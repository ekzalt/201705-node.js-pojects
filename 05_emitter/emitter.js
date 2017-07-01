const EventEmitter = require('events').EventEmitter;

/*
const vacation = new EventEmitter();
const hardWork = new EventEmitter();

const fun = (longevity, mess) => {
  console.log(`
		Im on vacation for ${longevity} days.
		And some messages - ${mess}
		`);
};

const fun1 = () => {
  console.log('!!!');
  hardWork.emit('start');   // из обработчика эмитим 
};

const beginWork = (longevity, mess) => {
  console.log('beginWork');
};

vacation.on('start', fun); // подписаться с определенной функцию
vacation.on('start', fun1); // подписаться с определенной функцию

hardWork.on('start', beginWork); // подписаться с определенной функцию

hardWork.once('start', beginWork); // исполнится один раз !!!

setTimeout(() => {
  vacation.emit('start', 100, 'Some mess')
}, 2000);

vacation.emit('start', 100, 'Some mess');
vacation.removeListener('start', fun); // отписать функцию
vacation.removeAllListeners('start'); // удалить всех подписчиков
*/

class MyOwnEE extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
  }

  convertName() {
    const oldName = this.name;
    console.log('this.name:', this.name);

    this.name = this.name.split('').reverse().join('');
    console.log('this.name reverse:', this.name);

    this.emit('reverse', oldName, this.name);
  }
}

const myE = new MyOwnEE('Bob');

myE.addListener('restart', (e, m) => {
  console.log('myE.name:', myE.name);
  console.log('e:', e);
  console.log('m:', m);
});

myE.on('foo', () => {
});
myE.on('foo', () => {
});
myE.on('foo', () => {
});

myE.on('reverse', (oldName, newName) => {
  console.log(`name changed ${oldName} -> ${newName}`);
});

myE.convertName();
myE.convertName(); // не сработает
myE.convertName(); // не сработает

console.log('myE.eventNames:', myE.eventNames);
console.log('myE.eventNames:', myE.eventNames());

myE.getMaxListeners(); // 10 max
// myE.listenersCount('foo'); // вернет кол-во повешеных foo => 3
myE.emit('restart', 'error', 'mess');
