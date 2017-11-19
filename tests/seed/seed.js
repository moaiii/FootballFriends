const {ObjectID} = require('mongodb');
const {User} = require('../../src/models/user.model');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: 'chris@test.com',
    password: 'password',
    tokens: [{
      access: 'auth',
      token: jwt.sign({
        _id: userOneId,
        access: 'auth'
      }, 'abc123').toString()
    }]
  }, 
  {
    _id: userTwoId,
    email: 'jen@test.com',
    password: 'password'
  }
];

const populateUsers = (done) => {
  User.remove({})
    .then(() => {
      // returns promise
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo])
        .then(() => {
          done();
        })
    });
}

module.exports = {users, populateUsers};