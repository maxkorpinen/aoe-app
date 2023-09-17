const router = require('express').Router()
const Unit = require('../schemas/unit')

router.get('/', async (req, res) => {
  const units = await Unit.find({})
  res.json(units)
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const unit = await Unit.find({ _id:id})
  res.send(unit)
})

module.exports = router