const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


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

gameSchema.statics.findAllGames = function(id) {
  let Game = this;

  return Game.find({
    '_creator': id
  })
    .then(games => {
      if(!games) console.log("~! No games found in the database for this user");

      console.log("Games found: ", games);

      return games;
    })
    .catch(e => {
      console.log("~! Error in gameSchema.statics.findAllGames: ", e);
    })
};

var Game = mongoose.model('Game', gameSchema, 'Games');

module.exports = Game;