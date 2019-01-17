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
    text: 'add responsive nav',
    completed: true,
    completedAt: 555
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

      //test GET /todos/:id
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

        it('should return 404 for non-object id', done => {
          request(app).get('/todos/1212')
          .expect(404)
          .end(done);
        })

      })

      //test DELETE /todos/:id
      describe('DELETE /todo/:id', () => {

        it('should remove a todo', done => {
          let id = Todos[1]._id.toString();
          request(app).delete(`/todos/${id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.todo._id).toBe(id);
          })
          .end((err, res) => {
            if(err){
              done(err);
            }
            Todo.findById(id).then(todo =>{
              expect(todo).toBeFalsy();
              done();

            })
            .catch(err => done(err))
          })
        })

        it('should return 404 if todo not found', done =>{
          let id = (new ObjectID).toHexString();
          request(app).delete(`/todos/${id}`).expect(404).end(done);
        })

        it('should return 404 if object id is invalid', done =>{
          request(app).delete(`/todos/1212323`).expect(404).end(done);
        })

      })

      //test PATCH /todos/:id
      describe('PATCH /todos/:id', () => {

        it('should update todo', done => {
          let id = (Todos[0]._id).toString()
          let testTodo = {text: 'testing text', completed: true}
            request(app).patch(`/todos/${id}`)
            .send(testTodo)
            .expect(200)
            .end((err, res) => {
              if(err){
                done(err)
              }
              expect(res.body.todo.text).toBe(testTodo.text)
              expect(res.body.todo.completed).toBeTruthy()
              expect(typeof res.body.todo.completedAt).toBe('number')
              done()
            })
        })

        it('should clear completedAt when to do is not completed', done => {
          let testTodo = {text: 'testing two', completed: false}
          let id = (Todos[1]._id).toString()
          request(app).patch(`/todos/${id}`)
          .send(testTodo)
          .expect(200)
          .end((err, res) => {
            if(err){
              done(err)
            }
            expect(res.body.todo.text).toBe(testTodo.text)
            expect(res.body.todo.completed).toBeFalsy()
            expect(res.body.todo.completedAt).toBeFalsy()
            done()
          })
        })
      })
