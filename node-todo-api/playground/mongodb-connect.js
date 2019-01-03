
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if(err){
    return console.log('Unable to connect to the database.');
  }
  const db = client.db('TodoApp');
  // db.collection('Todos').insertOne({
  //   text: 'wake up early',
  //   completed: false
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to create new collection');
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //   client.close();
  // })
  db.collection('User').insertOne(
    {
      name: 'Ermyas',
      age: 23,
      location: 'Silchar'
  }, (err, result) => {
    if(err){
      return console.log('Unable to create user collection!');
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  })
})
