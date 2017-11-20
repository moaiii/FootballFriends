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
  _creator: { // ref ->  User (player)
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  _teams: [{ // refs -> Teams
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }],
  score: [{
    home: {
      type: Number,
      required: false
    }
  }, {
    away: {
      type: Number,
      required: false
    }
  }],
  _winner: { // ref -> Team 
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  _slot: { // ref -> Team (1 to 1)
    type: mongoose.Schema.Types.ObjectId,
    required: false
  } 
});

var Game = mongoose.model('Game', gameSchema, 'Games');

module.exports = Game;