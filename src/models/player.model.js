const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var playerSchema = mongoose.Schema({
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
// is returned back to the player in the response
playerSchema.methods.toJSON = function() {
  var player = this;

  var playerObject = player.toObject();

  return {
    id: playerObject._id,
    email: playerObject.email
  }
};


// arrow functions dont bind a 'this' keyword
// so use a standard function call 
playerSchema.methods.generateAuthToken = function() {
  // bound to the instance of the model
  var player = this;

  var access = 'auth';
  
  // TODO: add secret value to process.env§§
  var token = jwt
    .sign({_id: player._id.toHexString(), access}, process.env.FF_SECURITY_SECRET).toString(); 

  // same as
  // player.tokens.push({access: access, token: token});
  player.tokens.push({access, token});
      
  // video (4) - 9 minutes 02 seconds
  return player.save().then(() => {
    return {token, player};
  });
};


playerSchema.methods.removeToken = function(token) {
  var player = this;

  return player.update({
    $pull: {
      tokens: {token} // es6 short sytax = token: token
    }
  });
};


playerSchema.statics.findByToken = function(token) {
  // bound to the model itself - class wide
  var Player = this;

  var decoded;

  try {
    decoded = jwt.verify(token, process.env.FF_SECURITY_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  // return a promise
  return Player.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};


playerSchema.statics.findByCredentials = function(email, password) {
  var Player = this;

  // return the result of the find One query !!!!!!!!
  return Player.findOne({email})
    .then(player => {
      if(!player) return Promise.reject();

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, player.password, (err, result) => {
          if(result) {
            resolve(player)
          } else {
            reject();
          }
        });
      })
    })
};


playerSchema.pre('save', function(next) {
  var player = this;

  if(player.isModified('password')) {
    // 10 = round - make it take longer so no one can brute force
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(player.password, salt, (err, hash) => {
        player.password = hash;
        next();
      });
    });

  } else {
    next();
  }
});


var Player = mongoose.model('Player', playerSchema, 'Players');

module.exports = Player;