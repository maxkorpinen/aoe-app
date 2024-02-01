const mongoose = require('mongoose')
const Unit = require('./unit')

const civSchema = new mongoose.Schema({
  //_id: ObjectId,
  name: String,
  description: String,
  units: [{
    unit: mongoose.ObjectId,
    powerModifier: Number
  }]
})

civSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    console.log("ret: ", returnedObject)
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Civ', civSchema)