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
      returnedObject.units[age] = returnedObject.units[age].map(unitObj => {
        if (unitObj.unit._id) {
          unitObj.unit.id = unitObj.unit._id.toString();
          delete unitObj.unit._id;
        }
        return unitObj;
      });
    });
  }
});

module.exports = mongoose.model('Civ', civSchema)