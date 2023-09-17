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

const asynkroninenKonteksti = async () => {
  const un = await Unit.deleteMany({})
  console.log(un)
}

const Unit= require('../schemas/unit')
const units = require('./units')
//asynkroninenKonteksti()

let saved = []
for (i in units) {
  let newunit = Unit(units[i])
  console.log(newunit)
  newunit.save().then(result => {
    console.log(units[i].name, " saved")
    saved = saved.concat(units[i].id )
    if (saved.length === 9) {
      mongoose.connection.close()
    }
  })
}

/* 
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


civ1.save().then(result => {
  console.log("civ saved")
  mongoose.connection.close()
})
 */

