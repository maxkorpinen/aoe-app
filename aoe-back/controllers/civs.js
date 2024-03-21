const router = require('express').Router()
const Civ = require('../schemas/civ')
const {punit, getPowerUnit, getCounters} = require('../utils/CivUtils')
const Winstats = require('../schemas/winstats')

// Endpoint for GETting all civs
router.get('/', async (req, res) => {
  try {
    const civs = await Civ.find({}).populate('units.feudal.unit units.castle.unit units.imperial.unit');
    res.json(civs);
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ message: error.message })
  }
});

router.get('/:id1/vs/:id2', async (req, res) => {
  try {
  const id1 = req.params.id1
  const id2 = req.params.id2
  const data = await Winstats.find({})
  const civ1 = await Civ.find({ _id:id1})
  const civ2 = await Civ.find({ _id:id2})
  const dada = JSON.parse(data[0].data)
  civ1name = civ1[0].name.toLowerCase()
  civ2name = civ2[0].name.toLowerCase()
  return res.status(200).json({ civ1wins: dada[civ1name][civ2name], 
                                civ2wins: dada[civ2name][civ1name]})
  } catch (err) {
    res.status(500).json({ message: error.message })
  }
})

// Endpoint for GETting a civ by id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const civ = await Civ.find({ _id: id })
    if (!civ) {
      return res.status(404).json({ message: 'Civ not found' })
    }
    res.json(civ)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.get('/:id/powerunit', async (req, res) => {
  const id = req.params.id
  const civ = await Civ.find({ _id:id})
  let powerunit = getPowerUnit(civ)
  //const counters = getCounters(powerunit.unit)
  //powerunit.counters = counters
  res.send(powerunit)
})

module.exports = router