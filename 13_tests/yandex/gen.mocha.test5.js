const assert = require('assert');

const generateNoteId = require('./gen');

////////////////////////////////////////////////

// only - прогонит только этот тест/блок

////////////////////////////////////////////////

describe('note id generator', function () {
  // прогонит только этот тест
  it.only('should cut first line', function () {
    let actual = generateNoteId('first\nsecond');

    assert.equal(actual, 'first');
  });

  it('should cast to lower case', function () {
    let actual = generateNoteId('ToDo');

    assert.equal(actual, 'todo');
  });
});

////////////////////////////////////////////////

describe('note id generator', function () {
  // прогонит только этот блок
  describe.only('spaces', function () {
    it('should replace " " -> "-"', function () {
      let actual = generateNoteId('todo list');

      assert.equal(actual, 'todo-list');
    });

    it('should exclude extra spaces', function () {
      let actual = generateNoteId('   hello   world   ');

      actual.should.be.equal(actual, 'hello-world');
    });
  });

  // следующий блок...
});

////////////////////////////////////////////////

// skip - пропустит только этот тест/блок

////////////////////////////////////////////////

describe('note id generator', function () {
  // пропустит только этот тест
  it.skip('should cut first line', function () {
    let actual = generateNoteId('first\nsecond');

    assert.equal(actual, 'first');
  });

  it('should cast to lower case', function () {
    let actual = generateNoteId('ToDo');

    assert.equal(actual, 'todo');
  });
});

////////////////////////////////////////////////

describe('note id generator', function () {
  // пропустит только этот блок
  describe.skip('spaces', function () {
    it('should replace " " -> "-"', function () {
      let actual = generateNoteId('todo list');

      assert.equal(actual, 'todo-list');
    });

    it('should exclude extra spaces', function () {
      let actual = generateNoteId('   hello   world   ');

      actual.should.be.equal(actual, 'hello-world');
    });
  });

  // следующий блок...
});
