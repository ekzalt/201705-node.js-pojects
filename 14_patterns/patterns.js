
//////////////////////////////////////////////////////

// DESIGN PATTERNS in JavaScript (шаблоны проектирования в JavaScript)

//////////////////////////////////////////////////////

// Object

// создание объекта через конструктор
var obj1 = new Object(); // var obj1 = new Object({ key: 'value' });

/*
http://learn.javascript.ru/prototype

Синтаксис:
Object.create(proto[, descriptors])

Создаёт пустой объект с __proto__, равным первому аргументу (кроме IE8-),
второй необязательный аргумент может содержать дескрипторы свойств.

Создание объекта с наследованием:
null (без прототипа, без наследования, без "лишних" свойств и методов)
Parent.prototype (наследуем свойства и методы от указанного конструктора-родителя)

Дополнительно о наследовании:
Object.getPrototypeOf(obj) // ES5, возвращает obj.__proto__ (кроме IE8-)
Object.setPrototypeOf(obj, proto) // ES6, устанавливает obj.__proto__ = proto (кроме IE10-).
*/

// создание объекта с указанным вручную наследованием
var obj2 = Object.create(null); // var obj2 = Object.create(Parent.prototype);

// создание объекта литерально
var obj3 = {};

/*
http://learn.javascript.ru/es-object

Синтаксис:
Object.assign(target, src1, src2...)

Функция Object.assign получает список объектов и копирует в первый target свойства из остальных.
При этом последующие свойства перезаписывают предыдущие.
*/

// ES6, "сборка" объекта из нескольких
let obj4 = Object.assign({}, obj1, obj2, obj3); // let obj4 = Object.assign({ key: 'value' }, obj1, obj2, obj3);

/*
ES8, "копирование" ключей из одного объекта в другой с использованием rest/spread оператора, 
выполяющего деструктуризацию объекта, к которому он применяется в данном контексте
http://babeljs.io/docs/plugins/transform-object-rest-spread/

Обертка над Object.assign({ key: 'value' }, obj1, obj2, obj3)
*/

// ES8, литеральное создание и "копирование" ключей из одного или нескольких объектов в другой
let obj5 = { ...obj1, ...obj2 };
let obj6 = { key: 'value', ...obj3, ...obj4, ...obj5 };

/*
http://learn.javascript.ru/descriptors-getters-setters

Методы для работы со свойствами объекта:
Object.defineProperty(obj, key, descriptor) // позволяет настроить ключ (который может быть свойством, методом или геттером/сеттером)
Object.defineProperties(obj, descriptors) // позволяет настроить несколько ключей сразу
Object.keys(obj) // возвращает массив ключей объекта (только enumerable: true)
Object.getOwnPropertyNames(obj) // возвращает массив всех ключей объекта
Object.getOwnPropertyDescriptor(obj, key) // возвращает объект-descriptor ключа объекта
Object.getOwnPropertyDescriptors(obj) // возвращает объект-descriptor для всех ключей объекта

Object.getOwnPropertySymbols(obj) // ES6, возвращает массив всех ключей-символов объекта
Object.values(obj) // ES8, возвращает массив значений объекта (только enumerable: true)

Редкие:
Object.preventExtensions(obj) // Запрещает добавление свойств в объект (удалить свойство можно)
Object.isExtensible(obj) // Возвращает false, если добавление свойств объекта было запрещено вызовом метода Object.preventExtensions()

Object.seal(obj) // Запрещает добавление и удаление свойств, все текущие свойства делает configurable: false
Object.isSealed(obj) // Возвращает true, если добавление и удаление свойств объекта запрещено, и все текущие свойства являются configurable: false

Object.freeze(obj) // Запрещает добавление, удаление и изменение свойств, все текущие свойства делает configurable: false, writable: false
Object.isFrozen(obj) // Возвращает true, если добавление, удаление и изменение свойств объекта запрещено, и все текущие свойства являются configurable: false, writable: false
*/

Object.defineProperty(obj1, 'key', {
  value: 'value',
  writable: false,
  enumerable: false,
  configurable: false
});

//////////////////////////////////////////////////////

// Constructor - Приватность VS Память

function Vegatable(public) {
  var private = 999;

  this.public = public;

  // найдет private - работа с приватными переменными, миримся с дополнительным расходом памяти.
  this.getPrivate = function () {
    return private;
  };
  // найдет и поменяет private - работа с приватными переменными, миримся с дополнительным расходом памяти.
  this.setPrivate = function (val) {
    private = val;
    return private;
  };
}

// Через prototype - не найдет private, но снизит расход памяти
Vegatable.prototype.getProp = function () {
  // return private;
  return this.public;
};

var cucumer1 = new Vegatable(111);
var cucumer2 = new Vegatable(222);

//////////////////////////////////////////////////////

// Module

/*
Модуль в единственном экземпляре, расход памяти мал.
Позволяет изолировать (инкапсулировать) блок кода, который может быть очень большим (например jQuery).
Позволяет управлять приватностью переменных и доступом к этим переменным.
*/

var Module = (function () {
  var private = 999;
  var public = 222;

  return {
    public: public,

    getPrivate: function () {
      return private;
    },

    setPrivate: function (val) {
      private = val;
      return private;
    }
  };
})();

Module.public;
Module.getPrivate();
Module.setPrivate(100500);

//////////////////////////////////////////////////////

// Factory

/*
Фабричный метод конструктора.
Настраивает стандартный экземпляр-объект, не модифицируя его.
*/

var Order = function (title, id, userId, token, status, isActive, created) {
  this.title = title;
  this.id = id;
  this.userId = userId;
  this.token = token;
  this.status = status;
  this.isActive = isActive;
  this.created = created;
};

Order.createOrder = function (id) {
  return new Order('', id, '', 'xxx', 'active', true, new Date());
};

var order1 = Order.createOrder(1);
var order2 = Order.createOrder(22);
var order3 = Order.createOrder(333);

//////////////////////////////////////////////////////

// Singleton

/*
Module + (по желанию Factory) + (по желанию Decorator)
Всегда возвращает только единственный экземпляр, создающийся в момент инициализации модуля.
*/

var Singleton = (function () {
  var singleInstanse;

  var SingleClass = function (title) {
    this.title = title;
  };

  var create = function (title) {
    if (!singleInstanse) {
      singleInstanse = new SingleClass(title);
    }

    return singleInstanse;
  };

  return { create: create };
})();

/*
2 разные переменные, указывают на 1 объект (изначальная переменная - singleInstanse) внутри замыкания. 
Объект в единственном экземпляре, расход памяти мал.
Он постоянно будет висеть в памяти в замыкании и никогда не умрет.
*/

var singleton1 = Singleton.create('Hello'); // singleton1.title === 'Hello'
var singleton2 = Singleton.create('Bye'); // singleton2.title === 'Hello'

//////////////////////////////////////////////////////

// Singleton Node.js

// В Node.js Common.js создает только 1 синглтон, не смотря на то, столько было подключений Модуля.

// user.js
const name = 'Vasya';

class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hello, my name is ${this.name}`;
  }
}

module.exports = new User(name); // module.exports === export default

// во всех других модулях будет только один экземпляр, не смотря на то, сколько было его подключений.

// app.js
const user = require('./user');
// other.js
const user = require('./user');

//////////////////////////////////////////////////////

// Decorator

/*
Декорация VS Наследование
Модифицирует стандартный экземпляр-объект, добавляя ему новые свойства и методы.
Борется с проблемами длинной цепочки прототипного наследования. 
*/

var Model = function (id) {
  this.id = id;

  /*
  // функциональный стиль объявления метода - лишний расход памяти (но доступ к приватным переменным)
  this.returnCompleteId = function() {
    return 'Hello, ' + this.id;
  };
  */
};

// прототипный стиль объявления метода - избавляемся от перерасхода памяти
Model.prototype.returnCompleteId = function () {
  return 'Hello, ' + this.id;
};

Model.createModel = function (id) {
  var model = new Model(id);

  model.title = 'Title';

  model.someMethod = function () {
    console.log('Yo! ' + model.id);
  };

  return model;
};

var standartModel = new Model(111);
standartModel.id;
standartModel.returnCompleteId();

var decoratedModel = Model.createModel(222);
// стандартные атрибуты
decoratedModel.id;
decoratedModel.returnCompleteId();
// дополнительные атрибуты
decoratedModel.title;
decoratedModel.someMethod();

//////////////////////////////////////////////////////

// Facade

/*
Хорошее решение для выполнения постоянной последовательности однотипных действий.
Сам делал такое в Node.js Express - асинхронная постоянная последовательность при работе с БД.
*/

var Model = function (id) {
  this.id = id;
};

Model.prototype.returnCompleteId = function () {
  console.log('Hello, ' + this.id);
  // return 'Hello, ' + this.id;
};

Model.prototype.processModel = function () {
  console.log('Model processed');
};

Model.prototype.stopProcessModel = function () {
  console.log('Model suspend');
};

Model.prototype.finalizeModel = function () {
  console.log('Model finish');
};

Model.prototype.completed = function () {
  this.returnCompleteId();
  this.processModel();
  this.stopProcessModel();
  this.finalizeModel();
};

var model = new Model(222);
model.completed();

//////////////////////////////////////////////////////

// Observer

/*
Наблюдаемый объект, который при изменении своего состояния 
эмитит кастомные события и вызывает колбеки.

На эти события можно подписаться 
т.е. передать в обсервер именованные колбеки, подписанные на конкретное событие.
Метод обсервера добавит эти колбеки в массив для последующего последовательного вызова.
Эти колбеки будут отрабатывать (вызываться обсервером) при эмите конкретного события.

Существует возможностть отписаться.
Метод обсервера найдет колбек по имени и удалит отписавшийся колбек из массива подписок.
*/

/*
ObserverList[
  logging(),
  auth(),
  ...
]
*/

// изначальный класс
class Test {
  constructor() {
    this.count = 1;
    this.name = '';
    this.status = false;
    this.longevity = null;
  }

  increaseCounter() {
    this.count++;
  }

  setTestParams(name, longevity, status) {
    this.name = name;
    this.longevity = longevity;
    this.status = status;
  }

  setTestParamsAsync() {
    this.setTestParams(`Test ${this.count}`, this.count * 10, true);

    let interval = setInterval(() => {
      this.increaseCounter();

      if (this.count > 4) {
        clearInterval(interval);
        return;
      }

      this.setTestParams(`Test ${this.count}`, this.count * 10, true);
    }, 500);
  }
}

// колбек notify
let notify = function () {
  const testStatus = this.status ? 'Passed' : 'Failed';
  console.log(`Test ${this.name} was ${testStatus} - longevity:${this.longevity}`);
}

// колбек logger
let logger = function () {
  console.log(`Test with name ${this.name} - running`);
}

// наследуем наблюдателя от оригинала
class ObservableTest extends Test {
  constructor() {
    super();

    // массив именованных колбеков
    this.observableList = [];
  }

  appendListener(functionName, listener) {
    if (typeof listener === 'function') {
      // let obj = { functionName, listener };
      // console.log('appendListener: this.observableList.push', obj);
      this.observableList.push({ functionName, listener });

      return true;
    }

    return false;
  }

  removeEventListener(listener) { // typeof listener === 'function'
    // console.log('removeEventListener listener:', listener);
    for (let i = 0; i < this.observableList.length; i++) {
      if (listener === this.observableList[i].listener) { // typeof this.observableList[i] === 'object'
        this.observableList.splice(i, 1);
        return;
      }
    }
  }

  notify(functionName) {
    for (let i = 0; i < this.observableList.length; i++) {
      if (this.observableList[i].functionName === functionName) {
        this.observableList[i].listener.call(this);
      }
    }
  }

  setTestParams(name, longevity, status) {
    super.setTestParams(name, longevity, status);
    if (this.observableList.length > 0) {
      this.notify('setTestParams');
    }
  }

  setTestParamsAsync() {
    super.setTestParamsAsync();
    if (this.observableList.length > 0) {
      this.notify('setTestParamsAsync');
    }
  }
}

const test1 = new ObservableTest();
test1.appendListener('setTestParams', notify);
test1.appendListener('setTestParams', logger);

// test1.removeEventListener(notify);
// test1.removeEventListener(logger);

test1.setTestParamsAsync();

//////////////////////////////////////////////////////

// Mediator (посредник)

// Придуман, чтобы подружить разные объектры с разными API

var Task = function (data) {
  this.name = data.name;
  this.priority = data.priority;
  this.project = data.project;
  this.user = data.user;
  this.completed = data.completed;
};

Task.prototype.complete = function () {
  console.log('completing task ' + this.name);
  this.completed = true;
};

Task.prototype.save = function () {
  console.log('saving task ' + this.name);
};

var notificationService = function () {
  var message = 'Notifying ';

  this.update = function (task) {
    console.log(message + task.user + ' for task ' + task.name);
  }
};
var loggingService = function () {
  var message = 'Logging ';

  this.update = function (task) {
    console.log(message + task.user + ' for task ' + task.name);
  }
}
var auditingService = function () {
  var message = 'Auditing ';

  this.update = function (task) {
    console.log(message + task.user + ' for task ' + task.name);
  }
};

// mediator-module
var mediator = (function () {
  var channels = {};

  var subscribe = function (channel, context, func) {
    if (!mediator.channels[channel]) mediator.channels[channel] = [];

    mediator.channels[channel].push({
      context: context,
      func: func
    });
  };

  var publish = function (channel) {
    if (!mediator.channels[channel]) return false;

    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < mediator.channels[channel].length; i++) {
      var sub = mediator.channels[channel][i];

      sub.func.apply(sub.context, args);
    }
  };

  return {
    channels: {},
    subscribe: subscribe,
    publish: publish
  };
})();

var task = new Task({
  name: 'create a demo for mediators',
  user: 'Jon'
});

var not = new notificationService();
var ls = new loggingService();
var audit = new auditingService();

mediator.subscribe('complete', not, not.update);
mediator.subscribe('complete', ls, ls.update);
mediator.subscribe('complete', audit, audit.update);

task.complete = function () {
  mediator.publish('complete', this);
  Task.prototype.complete.call(this);
};

task.complete();

//////////////////////////////////////////////////////

// Command

// Обращаемся к ...

class Cookie {
  bake(kg) {
    console.log(`cookie bake ${kg}`);
  }

  eat(times) {
    console.log(`cookie eat ${times}`);
  }
}

// decorator
let commandCookie = function () {
  const cookie = new Cookie();

  let commands = [];

  cookie.add = function (...args) {
    commands.push(...args);
  };

  cookie.undo = function () {
    this.execute();
  };

  cookie.execute = function () {
    // console.log(commands);
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      // console.log(command);
      // const args = command.arguments;
      // console.log(args);

      if (cookie[command] && typeof cookie[command] === 'function') cookie[command]();
    }

  };

  return cookie;
};

/*
аргументы не передаются
- надо толи добавлять с уже заданными жестко статическими аргументами .add()
- толи вызывать передавая имя функции и динамические аргументы .execute()
*/

let cookie = commandCookie();
cookie.add('eat', 'bake');
cookie.execute();

//////////////////////////////////////////////////////

// Chain of response (чейнинг)

class MyJquery {
  constructor() {
    this.capasity = 100;
  }

  getCapasity(num) {
    this.capasity -= num;
    console.log(this.capasity);
    return this;
  }

  sumCapasity(num) {
    this.capasity += num;
    console.log(this.capasity);
    return this;
  }
}

let jquery = new MyJquery();

jquery.getCapasity(2).sumCapasity(10).getCapasity(8);

//////////////////////////////////////////////////////

// Proxy

function GeoCoder() {
  this.getLatLng = function (address) {

    switch(address) {
      case 'Amsterdam': return '52.3700° N, 4.8900° E';
      case 'London':    return '51.5171° N, 0.1062° W';
      case 'Paris':     return '48.8742° N, 2.3470° E';
      case 'Berlin':    return '52.5233° N, 13.4127° E';
      default:          return '';
    }
  };
}

// proxy decorator
function GeoProxy() {
  var geocoder = new GeoCoder();
  var geocache = {};

  return {
    getLatLng: function (address) {
      if (!geocache[address]) geocache[address] = geocoder.getLatLng(address);

      log.add(address + ': ' + geocache[address]);

      return geocache[address];
    },
    getCount: function () {
      var count = 0;

      for (var code in geocache) count++;

      return count;
    }
  };
}

var log = (function () {
  var log = '';

  return {
    add: function (msg) {
      log += msg + '\n';
    },
    show: function () {
      console.log(log);
      log = '';
    }
  };
})();

function run() {
  var geo = new GeoProxy();

  geo.getLatLng('Amsterdam');
  geo.getLatLng('Paris');
  geo.getLatLng('Berlin');
  geo.getLatLng('London');
  geo.getLatLng('Amsterdam');
  geo.getLatLng('London');
  geo.getLatLng('Berlin');
  geo.getLatLng('Paris');

  log.add('\n Cache size: ' + geo.getCount());
  log.show();
}

run();

//////////////////////////////////////////////////////

// Strategy

class Order {
  constructor(func) {
    this.total = 100;
    this.tax = 5;
    this.func = func;
  }

  execute() {
    return this.func();
  }
}

const texasRateCalc = function () {
  return this.total + this.tax;
};

const wisconsinRateCalc = function () {
  return this.total - this.tax * 2;
};

let texasOrder = new Order(texasRateCalc);
let wisconsinOrder = new Order(wisconsinRateCalc);

console.log(texasOrder.execute());
console.log(wisconsinOrder.execute());
