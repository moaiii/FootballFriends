var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  payment: {
    type: Boolean,
    default: false
  },
  paymentDate: {
    type: String,
    default: null
  },
  paymentAmount: {
    type: Number,
    default: 0.00
  }
}, { 
  strict: false,
  collection: 'Players' 
});

playerSchema.methods.getName = () => {
  console.log('hello my name is ', this.name);
};

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;