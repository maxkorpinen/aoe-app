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
    // Convert _id to id and remove _id and __v
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    // Iterate over each age in the units object
    ['feudal', 'castle', 'imperial'].forEach(age => {
      // Check if units[age] is an array
      if (Array.isArray(returnedObject.units[age])) {
        // Map over each unit in the array
        returnedObject.units[age] = returnedObject.units[age].map(unitObj => {
          // Check if unit._id exists
          if (unitObj.unit && unitObj.unit._id) {
            // Convert unit._id to unit.id and remove unit._id
            unitObj.unit.id = unitObj.unit._id.toString();
            delete unitObj.unit._id;
          }
          return unitObj;
        });
      } else {
        // If units[age] is not an array, initialize it as an empty array
        returnedObject.units[age] = [];
      }
    });
  }
});

module.exports = mongoose.model('Civ', civSchema)