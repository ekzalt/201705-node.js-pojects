const assert = require('assert');

const generateNoteId = require('./gen');

// describe -> describe - группировка по типам
describe('note id generator', function () {
  // spaces
  describe('spaces', function () {
    it('should replace " " -> "-"', function () {
      let actual = generateNoteId('todo list');

      assert.equal(actual, 'todo-list');
    });

    it('should exclude extra spaces', function () {
      let actual = generateNoteId('   hello   world   ');

      actual.should.be.equal(actual, 'hello-world');
    });
  });

  // следующий тип...
});