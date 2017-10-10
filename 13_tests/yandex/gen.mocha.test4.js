const assert = require('assert');

const note = require('./note.controller');

// hook
describe('some test', function () {
  // один раз подключаемся к базе
  before(function (done) {
    MongoClient.connect(url)
      .then(db => console.log('Mongo connection OK'))
      .then(done, done);
  });

  // перед каждым тестом чистим нашу коллекцию
  beforeEach(function (done) {
    db.collection('notes').remove({}, () => done);
  });

  it('should create note', function () {
    note.createNote(123, 'myNote')
      .then(() => db.collection('notes').find({}).toArray)
      .then(actual => {
        assert.equal(actual.length, 1);
        assert.equal(actual[0].date, 123);
        assert.equal(actual[0].content, 'myNote')
      })
      .then(done, done);
  });

  // после прохождения всех тестов отключаемся от базы
  after(function () {
    return db.close();
  });
});
