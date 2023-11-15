const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fsokayttaja:${password}@23-klusteri.zbcqzfp.mongodb.net/fso-aoe?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const Unit= require('../schemas/unit')
const units = require('./units')

let saved = []
for (i in units) {
  let newunit = Unit(units[i])
  newunit.save().then(result => {
    console.log(units[i].name, " saved")
    saved = saved.concat(units[i].id )
    if (saved.length === 9) {
      mongoose.connection.close()
    }
  })
}