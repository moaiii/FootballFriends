const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true
  },
  postCode: {
    type: String,
    required: true,
    validate: {
      validator: validator.isPostalCode('GB'),
      message: '{VALUE} is not a valid postal code'
    }
  },
  contactFirstName: {
    type: String,
    required: true
  },
  contactLastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 4
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
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
// is returned back to the company in the response
companySchema.methods.toJSON = function() {
  var company = this;

  var companyObject = company.toObject();

  return {
    id: companyObject._id,
    email: companyObject.email
  }
};


// arrow functions dont bind a 'this' keyword
// so use a standard function call 
companySchema.methods.generateAuthToken = function() {
  // bound to the instance of the model
  var company = this;

  var access = 'auth';
  
  // TODO: add secret value to process.env§§
  var token = jwt
    .sign({_id: company._id.toHexString(), access}, process.env.FF_SECURITY_SECRET).toString(); 

  // same as
  // company.tokens.push({access: access, token: token});
  company.tokens.push({access, token});
      
  // video (4) - 9 minutes 02 seconds
  return company.save().then(() => {
    return {token, company};
  });
};


companySchema.methods.removeToken = function(token) {
  var company = this;

  return company.update({
    $pull: {
      tokens: {token} // es6 short sytax = token: token
    }
  });
};


companySchema.statics.findByToken = function(token) {
  // bound to the model itself - class wide
  var Company = this;

  var decoded;

  try {
    decoded = jwt.verify(token, process.env.FF_SECURITY_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  // return a promise
  return Company.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};


companySchema.statics.findByCredentials = function(email, password) {
  var Company = this;

  // return the result of the find One query !!!!!!!!
  return Company.findOne({email})
    .then(company => {
      if(!company) return Promise.reject();

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, company.password, (err, result) => {
          if(result) {
            resolve(company)
          } else {
            reject();
          }
        });
      })
    })
};


companySchema.pre('save', function(next) {
  var company = this;

  if(company.isModified('password')) {
    // 10 = round - make it take longer so no one can brute force
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(company.password, salt, (err, hash) => {
        company.password = hash;
        next();
      });
    });

  } else {
    next();
  }
});


var Company = mongoose.model('Company', companySchema, 'Companies');

module.exports = Company;