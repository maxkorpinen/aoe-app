const router = require('express').Router();
const Civ = require('../schemas/civ');

// Endpoint for returning unit comp based on civs
router.get('/', async (req, res) => {
  try {
    const { civ1, civ2 } = req.query;

    // Fetch both Civ documents and populate their units
    const [yourCiv, oppCiv] = await Promise.all([
      Civ.findById(civ1).populate('units.unit'),
      Civ.findById(civ2).populate('units.unit')
    ]);

    if (!yourCiv || !oppCiv) {
      return res.status(404).json({ message: 'One or both civilizations not found.' });
    }

    // Identify highest opponent powerModifier unit with isGoldUnit=true
    const oppComp = oppCiv.units
      .filter(({ unit }) => unit && unit.isGoldUnit)
      .sort((a, b) => b.powerModifier - a.powerModifier)[0];

    if (!oppComp) {
      return res.status(404).json({ message: 'No suitable opponent unit found.' });
    }

    // Find the highest powerModifier unit in yourCiv with isGoldUnit=true
    let yourComp = yourCiv.units
      .filter(({ unit }) => unit && unit.isGoldUnit && !oppComp.unit.counterOf.includes(unit.id))
      .sort((a, b) => b.powerModifier - a.powerModifier)[0];

    if (!yourComp) {
      yourComp = yourCiv.units
        .filter(({ unit }) => unit && !oppComp.unit.counterOf.includes(unit.id))
        .sort((a, b) => b.powerModifier - a.powerModifier)[0];
    }

    if (!yourComp) {
      return res.status(404).json({ message: 'No suitable unit found for your civilization.' });
    }

    // Convert to desired format
    const formatUnit = ({ unit }) => {
      return unit.toJSON();
    };

    console.log('Opponent Civ:', oppCiv.name); 
    console.log('Opponent Power Unit:', formatUnit(oppComp).name);
    console.log('Your Civ', yourCiv.name);
    console.log('Your Power Unit:', formatUnit(yourComp).name);

    // Respond with yourComp and oppComp
    res.json({
      oppComp: oppComp ? [formatUnit(oppComp)] : [],
      yourComp: yourComp ? [formatUnit(yourComp)] : []
    });
  } catch (error) {
    console.error('Error fetching civilizations:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/update', async (req, res) => {
  try {
    const { yourCiv, oppCiv, oppComp } = req.query;

    console.log('yourCiv:', yourCiv);
    console.log('oppCiv:', oppCiv);
    console.log('oppComp:', oppComp);

    res.json({ message: 'Endpoint called successfully.' });
  } catch (error) {
    console.error('Error updating matchup:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
