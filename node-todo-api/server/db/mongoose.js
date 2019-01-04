const mongoose = require('mongoose');
//set mongoose to return a global Promise
mongoose.Promise = global.Promise
//connect to mongodatabase
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});
