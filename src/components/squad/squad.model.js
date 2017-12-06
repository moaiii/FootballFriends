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

squadSchema.statics.findById = function(id) {
  return new Promise((resolve, reject) => {
    var User = this;
    
    User.findOne({_id: id})
      .then(squad => {
        resolve(squad);
      })
      .catch(e => {
        console.error("~! Could not find SQUAD by ID", e);
      });
  });
};

var Squad = mongoose.model('Squad', squadSchema, 'Squads');

module.exports  = Squad;