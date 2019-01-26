const mongoose = require('mongoose')
const validator = require('validator')
const jwt       = require('jsonwebtoken')
const _         = require('lodash')
const bcrypt    = require('bcryptjs')

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

//overwrite toJSON to return only email and id
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email'])

}


//find user using token
UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;
  try{
    decoded = jwt.verify(token, 'somesecret');
  }
  catch(err){
    return Promise.reject()
  }

  return User.findOne({
        '_id': decoded._id,
        'tokens.access': 'auth',
        'tokens.token': token
  });
}

//find user using email and password
UserSchema.statics.findByCredentials = function(email, password){
    var User = this;
    return User.findOne({email}).then((user) => {
      if(!user){
        return Promise.reject()
      }

      return new Promise((resolve, reject) => {
        //compare password with encrypted password
        bcrypt.compare(password, user.password, (err, res) => {
          if(res){
            resolve(user)
          }
          else{
            reject()
          }
        } )
      })
    }).
    catch((err) => Promise.reject())
}

//hash password
UserSchema.pre('save', function(next){
  var user = this;
  if(user.isModified('password')){

    bcrypt.genSalt(10, (err, salt) => {

      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })

    })


  }

  else{
    next();
  }
})


var User = mongoose.model('User',UserSchema);

module.exports = {User};
