const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found!'
  });
})

app.get('/users', (req, res) => {
  res.send([
    {
      name: 'Ermyas',
      age: 23
    },
    {
      name: 'Bereket',
      age: 17
    },
    {
      name: 'Mick',
      age: 25
    }
  ])
})
app.listen(3000);

module.exports = app;
