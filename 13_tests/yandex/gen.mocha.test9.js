const { should, expect } = require('chai');
const nock = require('nock');

const generateNoteId = require('./gen');

describe('note id generator', function () {
  /*
  // ходим в реальное API переводчика
  it('should translate', function () {
    return generateNoteId('привет')
      .then(actual => actual.should.be.equal('hi'));
  });
  */

  // используем фейковый http-запрос
  it('should translate', function () {
    nock('https://translate.yandex.net')
      .get('/api/v1.5/tr.json/translate')
      .query(true)
      .reply(200, { text: ['Hello, world!'] });

    return generateNoteId('Привет, мир!')
      .then(actual => actual.should.be.equal('hello-world'));
  });
});
