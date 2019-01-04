const mongoose = require('./db/mongoose'),
      {Todo}   = require('./models/todo'),
      {User}   = require('./models/todo');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('testing')
})

app.post('/todos', (req, res) => {
  console.log(req.body.text)
  res.send(req.body.text)
})

app.listen(3000, () => console.log('server running on port 3000'));
