const {ObjectID} = require('mongodb');
const jwt        = require('jsonwebtoken');

const {Todo}  = require('./../../models/todo');
const {User}  = require('./../../models/user');

const userIdOne = new ObjectID();
const userIdTwo = new ObjectID();

const todos = [
  {
    _id: new ObjectID(),
    text: 'add grid',
    _creator: userIdOne
  },
  {
    _id: new ObjectID(),
    text: 'add responsive nav',
    completed: true,
    completedAt: 555,
    _creator: userIdTwo
  }
];

const populateTodos = (done) => {
  Todo.deleteMany({})
  .then(() => {
     Todo.insertMany(todos);
  }).then((res) => done());
};


const users = [
  {
    _id: userIdOne,
    email: 'ermy@example.com',
    password: 'passwordOne',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userIdOne.toHexString(), access: 'auth'}, process.env.JWT_SECRET).toString()
    }],
  },
  {
    _id: userIdTwo,
    email: 'rich@example.com',
    password: 'passwordtwo',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userIdTwo.toHexString(), access: 'auth'}, process.env.JWT_SECRET).toString()
    }],
  }
]

const populateUsers = (done) => {
  User.deleteMany({})
  .then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  })
  .then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
