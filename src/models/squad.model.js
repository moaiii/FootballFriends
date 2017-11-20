var mongoose = require('mongoose');


var squadSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  _creator: { // ref -> 1 * User, auth
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  _players: [{ // ref -> user
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }]
});

var Squad = mongoose.model('Squad', squadSchema, 'Squads');

module.exports  = Squad;