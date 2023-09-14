const router = require('express').Router()
const Civ = require('../schemas/civ')
const {punit, getPowerUnit} = require('../utils/CivUtils')

router.get('/', async (req, res) => {
  const civs = await Civ.find({})
  res.json(civs)
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const civ = await Civ.find({ _id:id})
  const powerunit = getPowerUnit(civ)
  res.send(powerunit)
})

module.exports = router