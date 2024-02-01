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
    units: [{
      unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
      },
      powerModifier: Number,
      _id: false
    }]
  }, {
    timestamps: true,
  });

civSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Civ', civSchema)