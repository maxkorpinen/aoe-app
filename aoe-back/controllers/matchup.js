const router = require('express').Router();
const Civ = require('../schemas/civ');
const Unit = require('../schemas/unit');

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
    const { yourCiv: yourCivId, oppCiv: oppCivId, oppComp: oppCompIds } = req.query;

    // Fetch civs and units from the database
    const yourCiv = await Civ.findById(yourCivId).populate('units.unit');
    const oppComp = await Unit.find({ _id: { $in: oppCompIds } });

    // Filter for gold units which have all the opponent units' ids in their counterOf array
    const yourCounterGoldUnits = yourCiv.units
      .filter(({ unit }) => unit.isGoldUnit)
      .filter(({ unit }) => oppComp.every(oppUnit => unit.counterOf.includes(oppUnit.id)));

    // If such units exist, return the one with the highest powerModifier
    if (yourCounterGoldUnits.length > 0) {
      const yourCounterGoldUnit = yourCounterGoldUnits.sort((a, b) => b.powerModifier - a.powerModifier)[0];
      console.log('Your counter gold unit:', yourCounterGoldUnit.unit.name);
      return res.json({ yourComp: [yourCounterGoldUnit.unit.toJSON()] });
    }

    // Find the highest powerModifier unit with isGoldUnit = True
    const yourGoldUnit = yourCiv.units
      .filter(({ unit }) => unit.isGoldUnit)
      .sort((a, b) => b.powerModifier - a.powerModifier)[0];

    // If the id of your highest powerModifier unit which is a gold unit is not in the counterOf array of any of the opponent's units, return this unit
    if (!oppComp.some(oppUnit => oppUnit.counterOf.includes(yourGoldUnit.unit._id))) {
      return res.json({ yourComp: [yourGoldUnit.unit.toJSON()] });
    }

    // If oppComp has more than 3 units, return the highest powerModifier unit
    if (oppComp.length > 3) {
      return res.json({ yourComp: [yourGoldUnit.unit.toJSON()] });
    }

    // Create a list of all possible combinations of up to 2 units
    const combinations = getCombinations(yourCiv.units, 2);

    // Filter out combinations where more than one unit has isGoldUnit = True
    const validCombinations = combinations.filter(
      combination => combination.filter(({ unit }) => unit.isGoldUnit).length <= 1
    );

    // Calculate a score for each combination
    const scoredCombinations = validCombinations.map(combination => {
      const score = calculateScore(combination, oppComp);
      return { combination, score };
    });

    // Sort combinations by score and return the one with the highest score
    let { combination: yourComp } = scoredCombinations.sort((a, b) => b.score - a.score)[0];

    // Format yourComp to match the format in the / endpoint
    yourComp = yourComp.map(({ unit }) => unit.toJSON());

    res.json({ yourComp });
  } catch (error) {
    console.error('Error updating matchup:', error);
    res.status(500).json({ message: error.message });
  }
});

function getCombinations(array, max) {
  function* doCombination(offset, combo) {
    // Yield the combo if its length is between 1 and max
    if (combo.length >= 1 && combo.length <= max) {
      yield combo;
    }
    // Generate further combinations only if the length of combo is less than max
    if (combo.length < max) {
      for (let i = offset; i < array.length; i++) {
        yield* doCombination(i + 1, [...combo, array[i]]);
      }
    }
  }
  return Array.from(doCombination(0, []));
}

function calculateScore(combination, oppComp) {
  let score = 0;

  // Increase score by the average powerModifier
  score += combination.reduce((sum, { powerModifier }) => sum + powerModifier, 0) / combination.length;

  // Decrease score by the number of times our units are found in the counterOf arrays of oppComp
  score -= combination.reduce((sum, { unit }) => sum + oppComp.filter(oppUnit => oppUnit.counterOf.includes(unit.id)).length, 0);

  // Increase score by the number of times our units have ids in the counteredBy arrays of oppComp
  score += combination.reduce((sum, { unit }) => sum + oppComp.filter(oppUnit => oppUnit.counteredBy.includes(unit.id)).length, 0);

  return score;
}

module.exports = router;
