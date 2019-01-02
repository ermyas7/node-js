const request = require('supertest');
const expect = require('expect');
const app = require('./server');

describe('server', () => {
  describe('#Get /', () => {
    it("page not found exists", (done) => {
      request(app).get('/').expect((res) => {
        expect(res.body).toInclude({
          error: 'Page not found!'
        });
      }).end(done);
    });
  })

  describe('#Get /users', () => {
    it("should return users", (done) => {
      request(app)
      .get('/users').expect(200)
      .expect((res) => {
        expect(res.body).toInclude({
          name: 'Ermyas',
          age: 23
        });
      })
      .end(done);
    })
  })
})
