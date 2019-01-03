
const {MongoClient, ObjectID} = require('mongodb');

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
  db.collection('User').findOneAndUpdate({
    _id: new ObjectID("5c2db73ed741e54289821e3d")
  },
{
  $set:{
    name: 'Ermyas'
  },
  $inc:{
    age: 6
  }
}, {returnOrginal: false}).then((result) => {
  console.log(result)
})
})
