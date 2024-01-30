const mongoose = require('mongoose')

const civSchema = new mongoose.Schema({
  //_id: ObjectId,
  name: String,
  description: String,
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

civSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    console.log("_ID:",returnedObject)
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Civ', civSchema)