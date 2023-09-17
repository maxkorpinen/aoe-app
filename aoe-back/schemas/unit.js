const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  building: String,
  isGoldUnit: Boolean,
  counters: [],
  counteredBy: []
})

unitSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Unit', unitSchema)