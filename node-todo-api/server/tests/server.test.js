const expect   = require('expect'),
      request  = require('supertest');

const {User} = require('../models/user'),
      {Todo} = require('../models/todo'),
      {app}  = require('../server');

beforeEach((done) => {
  Todo.deleteMany({})
  .then(() => {
    done();
  })
})
      describe('Post /todos', () => {
        it('should create a new todo',  (done) => {
            var text = 'some test text';
            request(app).post('/todos').send({text})
            .expect(200)
            .expect((res) => {
              expect(res.body.text)
              .toBe(text);
            })
            .end((err, res) => {
              if(err){
                return done(err);
              }
              Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
              })
              .catch((err) => done(err))
            });
        });

        it('should not create a new todo with invalid body data', (done) => {
            request(app).post('/todos').send({})
            .expect(400)
            .end( (err, res) => {
              if(err){
                return done(err);
              }
              Todo.find({}).then((todos) =>{
                expect(todos.length).toBe(0);
                done();
              })
              .catch((err) => done(err));
            });
        })
      });
