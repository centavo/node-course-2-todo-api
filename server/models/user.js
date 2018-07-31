const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
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

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

//Instance method - gets called with the instance of the document - ie user = this
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  // user.tokens.push({access, token})  //changed as there were some issues with diff versions of MondgoDB
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => {
    return token;
  });
};

//Model method - model methods get called with the model as the 'this' binding, hence User = this
UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;
//jwt call will throw error if token doesn't match, hence need for try catch block
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch(e) {
    // can simplify code below - instead of returning new promise and reject straight away
    // can use one line.  Could be argument in reject('test') which would become the value
    // of (e) in the .catch clause when findByToken is called in server.js
    return Promise.reject();
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
  }
  return User.findOne({
    '_id': decoded._id, //quotes not needed since no . in value - put in for consistency
    'tokens.token': token, //quotes used to query a nested property
    'tokens.access': 'auth'
  });
};

UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    var password = user.password;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  }else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};
