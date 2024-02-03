const router = require('express').Router()
const Civ = require('../schemas/civ')

// Endpoint for returning unit comp based on civs
router.get('/', async (req, res) => {
  try {
    const {civ1, civ2} = req.query;
    console.log(civ1,civ2);
    res.json({civ1: [], civ2: []});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router