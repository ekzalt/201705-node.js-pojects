// mockery

const { should, expect } = require('chai');
const mockery = require('mockery');

describe('note id generator', function () {
  it('should translit russian chars', function () {
    function transliteMock (input) {
      input.should.be.equal('Привет, мир!');

      return 'Privet, mir!'
    }

    mockery.registerMock('translit', transliteMock);
    mockery.enable();

    const generateNoteId = require('./gen');

    let actual = generateNoteId('Привет, мир!');

    actual.should.be.equal('privet-mir');
  });
});
