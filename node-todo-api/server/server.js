const mongoose = require('./db/mongoose'),
      {Todo}   = require('./models/todo'),
      {ObjectID} = require('mongodb'),
      {User}   = require('./models/todo');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000 || process.env.PORT;

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

//search for specific todo using id
app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)){
    console.log('invalid id');
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo){
      console.log('no todo');
      return res.status(404).send();
    }

    res.send({todo});

  }).catch((err) => {
    res.status(400).send();
  })

});


app.listen(PORT, () => console.log(`server running on port 3000`));

module.exports = {app};
