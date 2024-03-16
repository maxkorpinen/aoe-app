const mongoose = require('mongoose')
const Unit = require('./unit')

const civSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  units: {
    feudal: [
      {
        unit: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Unit'
        },
        powerModifier: Number,
        _id: false
      }
    ],
    castle: [
      {
        unit: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Unit'
        },
        powerModifier: Number,
        _id: false
      }
    ],
    imperial: [
      {
        unit: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Unit'
        },
        powerModifier: Number,
        _id: false
      }
    ]
  }
}, {
  timestamps: true,
});

civSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    ['feudal', 'castle', 'imperial'].forEach(age => {
      returnedObject.units[age] = returnedObject.units[age].map(unit => {
        if (unit._id) {
          unit.id = unit._id.toString();
          delete unit._id;
        }
        return unit;
      });
    });
  }
});

module.exports = mongoose.model('Civ', civSchema)