const mongoose = require('mongoose')
const validator = require('validator')
const jwt       = require('jsonwebtoken')
const _         = require('lodash')

var UserSchema = mongoose.Schema(
  {
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

    tokens:[{
      access:{
        type: String,
        required: true
      },

      token:{
        type: String,
        require: true
      }

    }]
  }
);

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  //set token access
  var access = 'auth';

  //generate token
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'somesecret').toString();

  //set tokens to user model
  user.tokens = user.tokens.concat([{access, token}])

  //save user
  return user.save().then(() => {
    return token
  })
}

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email'])

}

var User = mongoose.model('User',UserSchema);

module.exports = {User};
