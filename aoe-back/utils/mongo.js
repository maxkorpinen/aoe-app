const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  //`mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`
  `mongodb+srv://fsokayttaja:${password}@23-klusteri.zbcqzfp.mongodb.net/fso-aoe?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

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

const Note = mongoose.model('Note', noteSchema)
const Civ = mongoose.model('Civ', civSchema)

const civ1 = new Civ({
  _id: 5,
  name: 'Mongols',
  units: [
    {
      militia: 4,
      spearman: 5,
      eagle: null,
      scout: 6,
      knight: 5,
      camel: 5,
      archer: 5,
      skirmisher: 5,
      carcher: 6
    }
  ]
})

const note = new Note({
  content: 'HTML is Easy',
  important: true,
})

civ1.save().then(result => {
  console.log("civ saved")
  mongoose.connection.close()
})

/* note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
}) */