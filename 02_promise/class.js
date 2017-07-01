class Vehicle {
  constructor(name) {
    this._name = name;
    this._wheels = 4;
  }
  
  get wheelsCount() {
    return this._wheels;
  }
  
  set wheelsCount(num) {
    this._wheels = num;
  }
  
  get carName() {
    return this._name;
  }
  set carName(str) {
    this._name = str;
  }
  
  go() {
    console.log('GO!');
  }
}

class Car extends Vehicle {
  constructor(fuel) {
    super();
    this._fuel = fuel;
  }
  
  static color() {
    return 'red';
  }
  
  go() {
    console.log(Car.color());
    console.log('DRR!');
    super.go();
  }
}