const mongoose = require('mongoose')

const winstatSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true
  }
},
{
  timestamps: true,
})

winstatSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('winstat', winstatSchema)