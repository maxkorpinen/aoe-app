const router = require('express').Router()
const Civ = require('../schemas/civ')
const {punit, getPowerUnit, getCounters} = require('../utils/CivUtils')

router.get('/', async (req, res) => {
  const civs = await Civ.find({})
  let ret = []
  for (const [key, value] of Object.entries(civs)) {
    let cur = civs[key]
    let newCivObj = {
      id: cur.id,
      name: cur.name,
      description: cur.description,
      units: cur.units,
    }
    ret.push(newCivObj)
  }
  res.json(ret)
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const civ = await Civ.find({ _id:id})
  res.json(civ)
})

router.get('/powerunit/:id', async (req, res) => {
  //still probably broken
  const id = parseInt(req.params.id)
  const civ = await Civ.find({ _id:id})
  let powerunit = getPowerUnit(civ)
  const counters = getCounters(powerunit.unit)
  powerunit.counters = counters
  res.send(powerunit)
})

module.exports = router