// DB design based from https://stackoverflow.com/questions/34577921/mongodb-database-design-for-different-type-of-users
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var userSchema = mongoose.Schema({
  isCompany: {
    type: Boolean,
    required: true
  },
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
  postcode: {
    type: String,
    required: true,
    minlength: 4
  },
  companyInfo: {
    businessName: {
      type: String,
      required: function() {
        return this.isCompany
      }
    },
    registeredBusinessAddress: {
      type: String,
      required: function() {
        return this.isCompany
      }.bind(this)
    },
    vatRegistrationNumber: {
      type: String
    },
    phoneNumber: {
      type: String,
      required: function() {
        return this.isCompany
      }
    }
  },
  userInfo: {
    friends: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
      },
      email: {
        type: String,
        required: false
      },
      invited: {
        type: Boolean,
        required: true
      },
      accepted: {
        type: Boolean,
        required: true
      }
    }],
    squads: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
      },
      name: {
        type: String,
        required: false
      },
      isCreator: {
        type: Boolean,
        required: true
      }
    }],
    travel: {
      distance: {
        type: Number,
        required: false
      },
      mode: {
        type: String,
        required: false
      }
    }
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
userSchema.methods.toJSON = function() {
  var user = this;

  var userObject = user.toObject();

  return {
    id: userObject._id,
    email: userObject.email
  }
};


userSchema.methods.getFriends = function() {
  return new Promise((resolve, reject) => {
    let user = this;
  
    let userObject = user.toObject();
  
    resolve({
      id: userObject._id,
      friends: userObject.userInfo.friends
    });
  });
};


userSchema.methods.addFriend = function(friend, accepted) {
  return new Promise((resolve, reject) => {
    let user = this;

    user.userInfo.friends.push({
      _id: friend._id,
      email: friend.email,
      invited: true,
      accepted: accepted
    });
    
    return user.save()
      .then(() => {
        resolve({
          friends: user.userInfo.friends
        });
      });
  });
};


userSchema.methods.addSquad = function(squadID, name, isCreator) {
  return new Promise((resolve, reject) => {
    let user = this;

    user.userInfo.squads.push({
      _id: squadID,
      name: name,
      isCreator: isCreator
    });
    
    return user.save()
      .then(() => {
        resolve({user});
      });
  });
};

userSchema.methods.acceptFriend = function(id) {
  return new Promise((resolve, reject) => {
    let user = this;

    user
      .findOneAndUpdate({
        'userInfo.friends._id': id
      }, {
        $set: { 'accepted': true}
      }, {
        'new': true
      })
        .then(doc => {
          user
            .save()
              .then(() => 
                resolve(user))
              .catch(e => {
                console.log("~! Error accepting friend in USER MODEL", e);
                reject(e)
              })
        })
    // user.userInfo.friends.filter(friend => friend._id === id)
 })
};

userSchema.statics.findByEmail = function(email) {
  return new Promise((resolve, reject) => {
    var User = this;
    
    User.findOne({email})
      .then(user => {
        resolve(user);
      })
      .catch(e => {
        console.error("~! Could not find user by email", e);
      });
  });
};

userSchema.statics.findById = function(id) {
  return new Promise((resolve, reject) => {
    var User = this;
    
    User.findOne({_id: id})
      .then(user => {
        resolve(user);
      })
      .catch(e => {
        console.error("~! Could not find user by ID", e);
      });
  });
};


// arrow functions dont bind a 'this' keyword
// so use a standard function call 
userSchema.methods.generateAuthToken = function() {
  // bound to the instance of the model
  var user = this;

  var access = 'auth';
  
  var token = jwt
    .sign({_id: user._id.toHexString(), access}, 
      process.env.FF_SECURITY_SECRET).toString(); 

  // same as
  // user.tokens.push({access: access, token: token});
  user.tokens.push({access, token});
      
  // video (4) - 9 minutes 02 seconds
  return user.save().then(() => {
    return {token, user};
  });
};


userSchema.methods.removeToken = function(tokenToRemove) {
  var user = this;

  return user.update({
    $pull: {
      'tokens': {
        'token': tokenToRemove
      }
    }
  });
};


userSchema.methods.updateTravel = function(distance, mode) {
  return new Promise((resolve, reject) => {
    let user = this;

    user.update({ 
      $set: {
        'userInfo.travel': {
          'distance': distance,
          'mode': mode
        }
      }
    })
    .then(() => {
      resolve(user);
    })
 })
};


userSchema.statics.findByToken = function(token) {
  // bound to the model itself - class wide
  var user = this;

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