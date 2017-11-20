const mongoose = require('mongoose');
const validator = require('validator');


var slotSchema = mongoose.Schema({
  startTime: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  _pitch: { // refs -> Pitch (1 to 1)
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  _game: { // refs -> Game (1 to 1)
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }
});

var Slot = mongoose.model('Slot', slotSchema, 'Slots');

module.exports = Slot;