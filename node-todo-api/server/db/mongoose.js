const mongoose = require('mongoose');
//set mongoose to return a global Promise
mongoose.Promise = global.Promise
const option = {
    keepAlive: 300000,
     connectTimeoutMS: 30000,
    useNewUrlParser: true
};

const mongoURI = 'mongodb://127.0.0.1:27017/TodoApp';
mongoose.connect(mongoURI, option).then(function(){
    //connected successfully
}, function(err) {
    //err handle
    console.log(err)
});
//connect to mongodatabase
//mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, err => console.log(err));
