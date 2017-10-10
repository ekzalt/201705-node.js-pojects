const assert = require('assert');

const generateNoteId = require('./gen');

// describe() и it() - это функции пакета mocha
describe('note id generator', function () {
  it('should cut first line', function () {
    let actual = generateNoteId('first\nsecond');

    assert.equal(actual, 'first');
  });

  it('should cast to lower case', function () {
    let actual = generateNoteId('ToDo');

    assert.equal(actual, 'todo');
  });

  it('should replace " " -> "-"', function () {
    let actual = generateNoteId('todo list');

    assert.equal(actual, 'todo-list');
  });
});