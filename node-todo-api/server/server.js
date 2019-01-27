require('./config/config')
const _ = require('lodash')
const mongoose = require('./db/mongoose')
const {ObjectID} = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')

var {Todo}   = require('./models/todo');
var {User}   = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());

//add new todo
app.post('/todos', (req, res) => {
  var newTodo = new Todo({
    text: req.body.text
  });
  newTodo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  });
});

//get all todos
app.get('/todos', (req, res) => {
  console.log('get all!')
  Todo.find().then((todos) => {
    res.send({
      todos
    })
  }).catch((err) => res.status(400).send(err));
})

//get specific todo using id
app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});

  }).catch((err) => {
    res.status(400).send();
  })

});

//delete specific todo
app.delete('/todos/:id', (req, res) => {
  let id = req.params.id
  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  Todo.findByIdAndDelete(id).then(todo => {
    if(!todo){
      res.status(404).send();
    }
    res.send({todo});
  })
  .catch(err => res.status(400).send());
})

//update specific todo
app.patch('/todos/:id', (req, res) => {
  let id = req.params.id
  let body = _.pick(req.body, ['text', 'completed'])

  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

if(_.isBoolean(body.completed) && body.completed){
  body.completedAt = new Date().getTime()
}

else{
  body.completed = false
  body.completedAt = null
}
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then(todo =>{
    if(!todo){
      res.status(404).send()
    }

    res.send({todo})
  })
  .catch(err => res.status(400).send());

})

/////////////////////////
//add new user
////////////////////////
app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password'])
  var user = new User(body);
  user.save()
  .then(() => {
    return user.generateAuthToken();
  })
  .then((token) => {
    res.header('x-auth',token).send(user)
  })
  .catch(err => {
    res.status(400).send()
  })
})

//////////////////////////////////////////////
///////////////individual user route  ////////////
////////////////////////////////////////////



app.get('/users/me',authenticate, (req, res) => {
  let user = req.user;
    res.send(user)
  })

  //////////////////////////////////////////////
  ///////////////login user route  ////////////
  ////////////////////////////////////////////

  app.post('/users/login', (req, res) => {

    //pick password and email from request data
    var body = _.pick(req.body, ['email', 'password'])

    //authenticate the given user using credentials
    User.findByCredentials(body.email, body.password)
    .then(user => {
       return user.generateAuthToken()
       .then((token) => {
         res.header('x-auth',token).send(user)
       })
    })
    .catch(err => {
      res.status(400).send()
    })
  })

  //////////////////////////////////////////////
  ///////////////logout user route  ////////////
  ////////////////////////////////////////////
  app.delete('/users/me/token',authenticate, (req, res) => {
    req.user.removeToken(req.token)
    .then(() =>{
      res.status(200).send();
    }, () => {
      res.status(400).send()
    })
  })

app.listen(PORT, () => console.log(`server running on port 3000`));

module.exports = {app};
