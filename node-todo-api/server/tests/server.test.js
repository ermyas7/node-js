const expect      = require('expect');
const {ObjectID}  = require('mongodb');
const request     = require('supertest');

const {User} = require('../models/user');
const {Todo} = require('../models/todo');
const {app}  = require('../server');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

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
            .get(`/todos/${todos[0]._id}`)
            .expect(200)
            .end((err, res) => {
              if(err){
                done(err);
              }
              expect(res.body.todo.text).toBe(todos[0].text)
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
          let id = todos[1]._id.toString();
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
          let id = (todos[0]._id).toString()
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
          let id = (todos[1]._id).toString()
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

      ///////////////////////////////////////////
      ////////////// login /////////////////////
      /////////////////////////////////////////

      describe('GET /users/me', () => {

        it('should return user if authenticated', done => {

          request(app).get('/users/me').set('x-auth', users[0].tokens[0].token)
          .expect(200)
          .expect(res =>{
            expect(res.body._id).toBe(users[0]._id.toHexString())
            expect(res.body.email).toBe(users[0].email)
          })
          .end(done)

        })

        it('should return 401 if not authorized', done => {
          request(app).get('/users/me')
          .expect(401)
          .expect(res => {
            expect(res.body).toEqual({});
          })
          .end(done)
        })

      })

      //////////////////////////////////////////////
      ///////////// SignUp ////////////////////////
      ////////////////////////////////////////////
      describe('POST /users', () => {

        it('should create a new user', done => {
          var email = 'test@example.com';
          var password  = 'pass123';
          request(app)
          .post('/users')
          .send({email, password})
          .expect(200)
          .expect(res => {
            expect(res.headers['x-auth']).toExist();
            expect(res.body._id).toExist();
          })
          .end(err => {
            if(err){
              done(err)
            }

            User.findOne({email})
            .then(user => {
              expect(user).toExist();
              expect(user.password).toNotEqual(password);
              done()
            }).catch(err => done(err))

          })

        })

        it('should return validation error if requested invalid', done => {

          request(app)
          .post('/users')
          .send({
            email: 'ermsd'
            , password: 'pas'
          })
          .expect(400)
          .end(done)
        })

        it('should not create user if email in use', done => {

          request(app)
          .post('/users')
          .send(
            {
              email: users[0].email,
               password: 'pasggg'
             })
          .expect(400)
          .end(done)
        })
      })


      //////////////////////////////////////////////////////
      /////////////////////////////////////////////////////
      ////////////  /users/login test  ////////////////////
      ////////////////////////////////////////////////////
      ///////////////////////////////////////////////////

describe('POST /users/login', () => {
  //test for valid credentials
  it('should login user and create auth token', (done) => {

    request(app)
    .post('/users/login')
    .send({
      email: users[1].email,
      password: users[1].password
    })
    .expect(200)
    .expect((res) => {
      expect(res.headers['x-auth']).toExist()
    })
    .end((err, res) => {
      if(err){
        done(err)
      }

      User.findById(users[1]._id)
      .then((user) => {
        expect(user.tokens[0]).toInclude({
              access: 'auth',
              token: res.headers['x-auth']
            })

        done()
      })
      .catch(err => done(err))

    })
  })

  //for invalid findByCredentials

    it('should reject invalid login', (done) => {

      request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist()
      })
      .end((err, res) => {
        if(err){
          done(err)
        }

        User.findById(users[1]._id)
        .then((user) => {
          expect(user.tokens.length).toBe(0);

          done()
        })
        .catch(err => done(err))

      })
    })

  })
