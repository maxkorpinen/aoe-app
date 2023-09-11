const mongoose = require('mongoose')

const civSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  units: [{
    militia: Number,
    spearman: Number,
    eagle: Number,
    scout: Number,
    knight: Number,
    camel: Number,
    archer: Number,
    skirmisher: Number,
    carcher: Number
  }]
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Civ', civSchema)