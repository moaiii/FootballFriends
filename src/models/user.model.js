const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    minlength: 1
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1
  },
  postCode: {
    type: String,
    required: true,
    minlength: 4
  },
  tokens: [{
    access: {
      type: String,
      required: true
    }, 
    token: {
      type: String,
      required: true
    }
  }]
});


// Overwrite the standard method to choose what info
// is returned back to the user in the response
userSchema.methods.toJSON = function() {
  var user = this;

  var userObject = user.toObject();

  return {
    id: userObject._id,
    email: userObject.email
  }
};


// arrow functions dont bind a 'this' keyword
// so use a standard function call 
userSchema.methods.generateAuthToken = function() {
  // bound to the instance of the model
  var user = this;

  var access = 'auth';
  
  // TODO: add secret value to process.env§§
  var token = jwt
    .sign({_id: user._id.toHexString(), access}, process.env.FF_SECURITY_SECRET).toString(); 

  // same as
  // user.tokens.push({access: access, token: token});
  user.tokens.push({access, token});
      
  // video (4) - 9 minutes 02 seconds
  return user.save().then(() => {
    return {token, user};
  });
};


userSchema.methods.removeToken = function(token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token} // es6 short sytax = token: token
    }
  });
};


userSchema.statics.findByToken = function(token) {
  // bound to the model itself - class wide
  var User = this;

  var decoded;

  try {
    decoded = jwt.verify(token, process.env.FF_SECURITY_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  // return a promise
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};


userSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  // return the result of the find One query !!!!!!!!
  return User.findOne({email})
    .then(user => {
      if(!user) return Promise.reject();

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if(result) {
            resolve(user)
          } else {
            reject();
          }
        });
      })
    })
};


userSchema.pre('save', function(next) {
  var user = this;

  if(user.isModified('password')) {
    // 10 = round - make it take longer so no one can brute force
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });

  } else {
    next();
  }
});


var User = mongoose.model('User', userSchema, 'Users');

module.exports = User;