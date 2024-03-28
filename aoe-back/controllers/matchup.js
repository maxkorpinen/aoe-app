const router = require('express').Router();
const Civ = require('../schemas/civ');
const Unit = require('../schemas/unit');
const {compEval} = require('../utils/compEval')

// Endpoint for returning the opponent's powerModifier unit with isGoldUnit=true
router.get('/', async (req, res) => {
  try {
    const { oppCivId, oppAge } = req.query;
    //console.log('Civ:', oppCivId);

    // Fetch Civ document and populate its units
    const oppCiv = await Civ.findById(oppCivId).populate('units.feudal.unit units.castle.unit units.imperial.unit');

    if (!oppCiv) {
      return res.status(404).json({ message: 'Civilization not found.' });
    }

    // Identify highest opponent powerModifier unit with isGoldUnit=true
    const oppComp = oppCiv.units[oppAge]
      .filter(({ unit }) => unit && unit.isGoldUnit)
      .sort((a, b) => b.powerModifier - a.powerModifier)[0];

    if (!oppComp) {
      return res.status(404).json({ message: 'No suitable opponent unit found.' });
    }

    // Convert to desired format
    const formatUnit = ({ unit }) => {
      return unit.toJSON();
    };

    //console.log('Opponent Civ:', oppCiv.name);
    //console.log('Opponent Power Unit:', formatUnit(oppComp).name);

    // Respond with oppComp
    res.json(oppComp ? [formatUnit(oppComp)] : []);
  } catch (error) {
    console.error('Error fetching civilization:', error);
    res.status(500).json({ message: error.message });
  }
});

// Endpoint for updating the user's best counter to the opponent's comp
router.get('/update', async (req, res) => {
  try {
    // We get IDs of both civs and an array of unit IDs from the request query
    const { yourCiv: yourCivId, oppCiv: oppCivId, oppComp: oppCompIds, yourAge, oppAge } = req.query;

    //console.log(oppCompIds)
    // Fetch civs and units from the database
    // Fetch civs and units from the database
    const yourCiv = await Civ.findById(yourCivId).populate(`units.${yourAge}.unit`);
    const oppCiv = await Civ.findById(oppCivId).populate(`units.${oppAge}.unit`);

    // console.log('Your Units:', yourCiv.units);

    // Here we add powerModifiers to the opponent's units
    const oppComp = oppCiv.units[oppAge]
      .filter(({ unit }) => oppCompIds.includes(unit._id.toString()))
      .map(({ unit, powerModifier }) => ({
        ...unit._doc,
        powerModifier
      }));

    // Calculate the average powerModifier of the opponent's comp
    const oppCompPowerModifier = oppComp.reduce((sum, { powerModifier }) => sum + powerModifier, 0) / oppComp.length;

    // Constants
    const MAX_UNITS = 2;
    const OPPONENT_UNIT_THRESHOLD = 3;
    const PM_AVERAGE = 4;

    // Find the highest powerModifier unit with isGoldUnit = True
    const yourGoldUnit = yourCiv.units[yourAge]
      .filter(({ unit }) => unit.isGoldUnit)
      .sort((a, b) => b.powerModifier - a.powerModifier)[0];

    // If opponent only has one unit, return your highest powerModifier gold unit and the highest powerModifier non-gold unit which has the opponent unit's id in it's counterOf array.
    if (oppComp.length === 1) {
      const oppUnitId = oppComp[0]._id;
    
      const yourGoldUnit = yourCiv.units[yourAge]
        .filter(({ unit }) => unit.isGoldUnit)
        .filter(({ unit }) => unit.isMeta)
        .sort((a, b) => b.powerModifier - a.powerModifier)[0];

      //console.log('Your Gold Unit:', yourGoldUnit)
      // If this unit counters the enemy unit, return it
      if (yourGoldUnit.unit.counterOf.includes(oppUnitId)) {
        return res.json({ yourComp: [yourGoldUnit.unit.toJSON()] });
      }

      const yourCounterNonGoldUnit = yourCiv.units[yourAge]
        .filter(({ unit }) => !unit.isGoldUnit && unit.counterOf.includes(oppUnitId))
        .sort((a, b) => b.powerModifier - a.powerModifier)[0];
    
      if (!yourCounterNonGoldUnit) {
        console.log('No non-gold unit found that counters the opponent\'s unit');
      }

      compEval(oppComp, [yourGoldUnit, yourCounterNonGoldUnit])
    
      if (yourGoldUnit && yourCounterNonGoldUnit) {
        return res.json({ yourComp: [yourGoldUnit.unit.toJSON(), yourCounterNonGoldUnit.unit.toJSON()] });
      }
    }

    // Filter for gold units which have all the opponent units' ids in their counterOf array and that are meta and that have reasonable powerModifier
    const yourCounterGoldUnits = yourCiv.units[yourAge]
      .filter(({ unit }) => unit.isGoldUnit)
      .filter(({ unit }) => unit.isMeta)
      .filter(({ powerModifier }) => powerModifier > PM_AVERAGE)
      .filter(({ unit }) => oppComp.every(oppUnit => oppUnit.counteredBy.includes(unit.id)));

    // If such units exist, return the one with the highest powerModifier
    if (yourCounterGoldUnits.length > 0) {
      const yourCounterGoldUnit = yourCounterGoldUnits.sort((a, b) => b.powerModifier - a.powerModifier)[0];
      console.log('Your counter gold unit:', yourCounterGoldUnit.unit.name);
      return res.json({ yourComp: [yourCounterGoldUnit.unit.toJSON()] });
    }

    // If the id of your highest powerModifier unit which is a gold unit is not in the counterOf array of any of the opponent's units, return this unit
    if (!oppComp.some(oppUnit => oppUnit.counterOf.includes(yourGoldUnit.unit._id))) {
      return res.json({ yourComp: [yourGoldUnit.unit.toJSON()] });
    }

    // If oppComp has more than 3 units, return your highest powerModifier gold unit
    if (oppComp.length > 3) {
      return res.json({ yourComp: [yourGoldUnit.unit.toJSON()] });
    }

    // If no easy gold counter is found, we will calculate the best combination of up to 2 units

    // Create a list of all possible combinations of up to 2 units
    const combinations = getCombinations(yourCiv.units[yourAge], 2);

    // Filter out combinations where more than one unit has isGoldUnit = True
    const validCombinations = combinations.filter(
      combination => combination.filter(({ unit }) => unit.isGoldUnit).length <= 1
    );

    // Calculate a score for each combination
    const scoredCombinations = validCombinations.map(combination => {
      const score = calculateScore(combination, oppComp);
      return { combination, score };
    });

    // Sort combinations by score, isMeta count, and number of units, and return the one with the highest score, isMeta count, and fewer units
    let { combination: yourComp } = scoredCombinations.sort((a, b) => {
      // If scores are equal, prefer the combination with more units with isMeta = true
      if (a.score === b.score) {
        const aMetaCount = a.combination.filter(({ unit }) => unit.isMeta).length;
        const bMetaCount = b.combination.filter(({ unit }) => unit.isMeta).length;
        if (aMetaCount === bMetaCount) {
          // If Meta counts are equal, prefer the combination with fewer units if there is a unit that has all opponent unit IDs in its counterOf array
          const aHasCounter = a.combination.some(({ unit }) => oppComp.every(oppUnit => unit.counterOf.includes(oppUnit.id)));
          const bHasCounter = b.combination.some(({ unit }) => oppComp.every(oppUnit => unit.counterOf.includes(oppUnit.id)));
          if (aHasCounter && bHasCounter) {
            return a.combination.length - b.combination.length;
          }
        }
        return bMetaCount - aMetaCount;
      }
      // Otherwise, prefer the combination with the higher score
      return b.score - a.score;
    })[0];

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
