const router = require('express').Router()
const Unit = require('../schemas/unit')

// Endpoint for GETting all units
router.get('/', async (req, res) => {
  try {
    const units = await Unit.find({});
    res.json(units);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint for GETting a unit by id
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const unit = await Unit.find({ _id: id });
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }
    res.json(unit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router