const {ObjectID} = require('mongodb');

const {mongoose} = require('../db/mongoose');
const {Todo} = require('../models/todo');

//return all todo lists
// Todo.find().then((todos) => {
//   console.log(todos);
// })

//find many which satisfy specific condition
// Todo.find({completed: true}).then((todos) => {
//   console.log(todos)
// }, (err) => {
//   console.log('error happened!')
// })

//find only one with specific condition
// Todo.findOne({completed: true}).then((todos) => {
//   console.log(todos)
// }, (err) => {
//   console.log('error happened!')
// })

//find one by
var id = '5c2f8e5daf93a120e2104aa3';
if(!ObjectID.isValid(id)){
  return console.log('error');
}
  Todo.findById(id).then((todo) => {
    if(!todo){
      return console.log('id not found!');
    }
    console.log(todo)
  }, (err) => {
    console.log('error happened!')
  })
