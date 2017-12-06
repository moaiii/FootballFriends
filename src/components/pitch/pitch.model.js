const mongoose = require('mongoose');
const validator = require('validator');


var pitchSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  _company: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  schedule: [{
    timeStart: {
      type: Date,
      required: false
    },
    timeEnd: {
      type: Date,
      required: false
    },
    price: {
      type: Number, 
      required: false
    },
    _game: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
    }
  }]
});

var Pitch = mongoose.model('Pitch', pitchSchema, 'Pitches');

module.exports = Pitch;