const { should, expect } = require('chai');
const supertest = require('supertest');

// тестируем приложение на express.js
const app = require('./app');

describe('note page', function () {
  it('should return note', function (done) {
    supertest(app)
      .get('/notes/films')
      .set('Cookie', 'secret')
      .expect('Content-Type', 'text/html')
      .expect(200, done);
  });

  it('should return 404', function (done) {
    supertest(app)
      .get('/notes/nopage')
      .expect(404, done);
  });

  it('should create note', function (done) {
    supertest(app)
      .post('/notes')
      .send({ id: 123, content: 'myNote' })
      .expect(200, done)
      .end((err, res) => {
        let body = res.body;
        let expectedBody = { id: 123, content: 'myNote' };

        body.should.deep.equal(expectedBody);
        done(err);
      });
  });
});
