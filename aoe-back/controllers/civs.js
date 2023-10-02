const router = require('express').Router()
const Civ = require('../schemas/civ')
const {punit, getPowerUnit, getCounters} = require('../utils/CivUtils')

router.get('/', async (req, res) => {
  const civs = await Civ.find({})
  res.json(civs)
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const civ = await Civ.find({ _id:id})
  res.json(civ)
})

router.get('/powerunit/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const civ = await Civ.find({ _id:id})
  let powerunit = getPowerUnit(civ)
  const counters = getCounters(powerunit.unit)
  powerunit.counters = counters
  res.send(powerunit)
})

module.exports = router