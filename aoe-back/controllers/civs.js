const router = require('express').Router()
const Civ = require('../schemas/civ')

/* civs = ['Aztecs', 
        'Bengalis',
        'Berbers', 
        'Bohemians',
        'Britons',
        'Bulgarians',
        'Burgundians',
        'Burmese',
        'Byzantines',
        'Celts',
        'Chinese',
        'Cumans',
        'Dravidians',
        'Ethiopians',
        'Franks',
        'Goths',
        'Gurjaras',
        'Hindustanis',
        'Huns',
        'Incas',
        'Italians',
        'Japanese',
        'Khmer',
        'Koreans',
        'Lithuanians',
        'Magyars',
        'Malay',
        'Malians',
        'Mayans',
        'Mongols',
        'Persians',
        'Poles',
        'Portuguese',
        'Saracens',
        'Sicilians',
        'Slavs',
        'Spanish',
        'Tatars',
        'Teutons',
        'Turks',
        'Vietnamese',
        'Vikings'] */

/* router.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
}) */

router.get('/', async (req, res) => {
  const civs = await Civ.find({})
  res.json(civs)
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const civ = await Civ.find({ _id:id})

  const civUnits = civ[0].units[0]
  console.log(civUnits)
  //const punits = punit(id)
  let highestValueUnit = ''
  let highestValue = 0
  for (let unit in civUnits) {
    if (civUnits[unit] > highestValue) {
      highestValue = civUnits[unit]
      highestValueUnit = unit
    }
  } 
  console.log("jeejee",highestValueUnit, highestValue)
  res.send({unit: highestValueUnit, value: highestValue})
  //res.send({unit: highestValueUnit, value: highestValue})
})



module.exports = router