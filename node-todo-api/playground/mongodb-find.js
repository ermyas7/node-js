const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if(err){
    return console.log('Unable to connect to the database.');
  }
  const db = client.db('TodoApp');
  db.collection('User').find({name: 'Ermyas'}).toArray().then((docs) => {
    console.log(docs)
  }, (err) => {
    console.log('error');
  })
  client.close();
})
