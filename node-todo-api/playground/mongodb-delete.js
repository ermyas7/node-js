const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if(err){
    return  console.log('Unable to connect to the database!');
  }
  console.log('connected to the mongo database!');
  const db = client.db('TodoApp');

  //delete many
  // db.collection('User').deleteMany({name: 'Ermyas'}).then((result) => {
  //   console.log(result);
  // })

  //delete one

  // db.collection('User').deleteOne({name: 'Tensae'}).then((result) => {
  //   console.log(result);
  // })

  //find one and delete

  db.collection('User').findOneAndDelete({name: 'Bereket'}).then((result) => {
    console.log(result);
  })
  //client.close();
})
