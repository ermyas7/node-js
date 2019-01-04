const mongoose = require('mongoose');

//set mongoose to return a global Promise
mongoose.Promise = global.Promise
//connect to mongodatabase
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt:{
    type: Number,
    default: null
  }
});

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

// var newTodo = new Todo({
//   text: 'finish nodejs'
// })
//
// newTodo.save().then((doc) => {
//   console.log('saved doc: ', doc)
// }, (err) => {
//   console.log('Unable to create collection', err)
// })

var newUser = new User({
  name: 'Ermyas',
  email: 'ermyas@example.com'
});

newUser.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
  console.log('Error :', err);
})
