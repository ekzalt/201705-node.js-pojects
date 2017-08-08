const assert = require('chai').assert;

const MathService = require('./math.service.js');

test('Test Math Service. Input 1 expected result 2', () => {
  // Arrange
  const inputNumber = 1;
  const expectedResult = 2;

  // Act
  const result = MathService.increment(inputNumber);

  // Assert
  assert.equal(result, expectedResult, `Increment is not equal ${expectedResult}`);
});

test('Test Math Service. Input 1 and increment step 2 expected result 3', () => {
  // Arrange
  const inputNumber = 1;
  const incrementStep = 2;
  const expectedResult = 3;

  // Act
  const result = MathService.increment(inputNumber, incrementStep);

  // Assert
  assert.equal(result, expectedResult, `Increment is not equal ${expectedResult}`);
});

test('Test Math Service. Input string expected throw error', () => {
  // Arrange
  const inputNumber = 'string';
  
  assert.throw(() => {
    MathService.increment(inputNumber);
  }, Error, 'Wrong type of input element');
});

test('Test Math Service. Input string expected throw error', () => {
  // Arrange
  const inputStep = 'string';
  
  assert.throw(() => {
    MathService.increment(1, inputStep);
  }, Error, 'Wrong type of input element');
});

test('Test Math Service. Input 10 expected result 10', () => {
  // Arrange
  const inputNumber = 10;
  const expectedResult = 10;

  // Act
  const result = MathService.increment(inputNumber);

  // Assert
  assert.equal(result, expectedResult, `Increment is not equal ${expectedResult}`);
});

test('Test Math Service. Decrement. Input 10 expected result 9', () => {
  // Arrange
  const inputNumber = 10;
  const expectedResult = 9;

  // Act
  const result = MathService.decrement(inputNumber);

  // Assert
  assert.equal(result, expectedResult, `Decrement is not equal ${expectedResult}`);
});

test('Test Math Service. Decrement. Input string to inputNumber expected throw error', () => {
  // Arrange
  const inputNumber = 'string';
  
  assert.throw(() => {
    MathService.decrement(inputNumber);
  }, Error, 'Wrong type of input element');
});

test('Test Math Service. Decrement. Input string to inputStep expected throw error', () => {
  // Arrange
  const inputStep = 'string';
  
  assert.throw(() => {
    MathService.decrement(1, inputStep);
  }, Error, 'Wrong type of input element');
});

test('Test Math Service. Decrement. Input 0 expected result 0', () => {
  // Arrange
  const inputNumber = 0;
  const expectedResult = 0;

  // Act
  const result = MathService.decrement(inputNumber);

  // Assert
  assert.equal(result, expectedResult, `Decrement is not equal ${expectedResult}`);
});

test('Test asyncIncrement. Input 1 expected 2', (done) => {
  const input = 1;
  const step = 1;

  const callback = (value) => {
    assert.equal(value, 2, 'Value is not equal 2');
    done();
  };

  MathService.asyncIncrement(input, step, callback);
});

test('Test asyncDecrement. Input 1 expected 0', () => {
  const input = 1;

  return MathService.asyncDecrement(input)
    .then(result => {
      assert.equal(result, 0, 'Value is not equal 0');
    });
});
