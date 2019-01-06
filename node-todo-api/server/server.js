const mongoose = require('./db/mongoose'),
      {Todo}   = require('./models/todo'),
      {User}   = require('./models/todo');

const express = require('express');
const bodyParser = require('body-parser');
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
  Todos.find().then((todos) => {
    res.send({
      todos
    })
  }).catch((err) => res.status(400).send(err));
})
app.listen(3000, () => console.log('server running on port 3000'));

module.exports = {app};
