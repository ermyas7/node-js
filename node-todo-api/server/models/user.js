const mongoose = require('mongoose')
const validator = require('validator')

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate:{
      validator: validator.isEmail,
      message:`{VALUE} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  token:[{
    acess:{
      type: String,
      required: true
    },
    tokens:{
      type: String,
      require: true
    }
  }]
});


module.exports = {User};
