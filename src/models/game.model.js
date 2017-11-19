const mongoose = require('mongoose');


var gameSchema = mongoose.Schema({
  date: {
    type: Date,
    required: false
  },
  aside: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

var Game = mongoose.model('Game', gameSchema, 'Games');

module.exports = Game;