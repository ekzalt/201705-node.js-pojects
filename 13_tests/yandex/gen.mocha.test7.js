// sinon stub

const { should, expect } = require('chai');
const mockery = require('mockery');
const sinon = require('sinon');

describe('note id generator', function () {
  it('should translit russian chars', function () {
    // создаем заглушку-пенек :)
    let stub = sinon.stub();
    // настраиваем пенек
    stub.withArgs('Привет, мир!').onFirstCall.returns('Privet, mir!');
    stub.throws(Error('wrong translit argument'));

    mockery.registerMock('translit', stub);
    mockery.enable();

    const generateNoteId = require('./gen');

    let actual = generateNoteId('Привет, мир!');

    actual.should.be.equal('privet-mir');
  });
});
