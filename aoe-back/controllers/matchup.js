const router = require('express').Router()
const Civ = require('../schemas/civ')

router.get('/', async (req, res) => {
  const {civ1, civ2} = req.query
  console.log(civ1,civ2)
  return {civ1: [], civ2: []}
})

module.exports = router