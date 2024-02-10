const router = require('express').Router()
const Civ = require('../schemas/civ')
const {punit, getPowerUnit, getCounters} = require('../utils/CivUtils')

// Endpoint for GETting all civs
router.get('/', async (req, res) => {
  try {
    const civs = await Civ.find({})
    let ret = []
    for (const [key, value] of Object.entries(civs)) {
      let cur = civs[key]
      let newCivObj = {
        id: cur.id,
        name: cur.name,
        description: cur.description,
        units: cur.units,
        image: cur.image,
      }
      ret.push(newCivObj);
    }
    res.json(ret);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

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