const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  building: {
    type: String,
    required: true
  },
  isGoldUnit: {
    type: Boolean,
    required: true
  },
  counterOf: [],
  counteredBy: [],
  image: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
});

unitSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Unit', unitSchema)