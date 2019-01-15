const expect   = require('expect'),
      {ObjectID} = require('mongodb'),
      request  = require('supertest');

const {User} = require('../models/user'),
      {Todo} = require('../models/todo'),
      {app}  = require('../server');

const Todos = [
  {
    _id: new ObjectID(),
    text: 'add grid'
  },
  {
    _id: new ObjectID(),
    text: 'add responsive nav'
  }
];

beforeEach((done) => {
  Todo.deleteMany({})
  .then(() => {
     Todo.insertMany(Todos);
  }).then((res) => done());
})

    //test POST /todos
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
              Todo.find({text}).then((todos) => {
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
              Todo.find().then((todos) =>{
                expect(todos.length).toBe(2);
                done();
              })
              .catch((err) => done(err));
            });
        })
      });

      //test GET /todos
      describe('Get /todos', () => {

        it('should return all todos', (done) => {
          request(app).get('/todos')
          .expect(200).end((err, res) => {
            if(err){
              return done(err);
            }
            expect(res.body.todos.length).toBe(2);
            done();
          })
        })

      })

      //test GET /todos/:// id
      describe('GET /todos/:id', () => {

        it('should return todo doc', (done) => {
          request(app)
            .get(`/todos/${Todos[0]._id}`)
            .expect(200)
            .end((err, res) => {
              if(err){
                done(err);
              }
              expect(res.body.todo.text).toBe(Todos[0].text)
              done();
            })
        })

        it('should return 404 if todo not found', done => {
          request(app).get(`/todos/${new ObjectID}`)
          .expect(404)
          .end(done);
        })
        
        it('should return 404 for none object id', done => {
          request(app).get('/todos/1212')
          .expect(404)
          .end(done);
        })

      })
