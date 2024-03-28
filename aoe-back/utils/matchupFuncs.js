const mongoose = require('mongoose');

function pickBestMainUnit(units, age) {
  const metaUnits = units[age].filter(({ unit }) => unit && unit.isMeta);

  const metaUnitsWithTotalPower = metaUnits.map(metaUnit => {
    const totalPowerModifier = ['feudal', 'castle', 'imperial'].reduce((total, age) => {
      const ageUnits = units[age];
      if (Array.isArray(ageUnits)) {
        const sameUnitInAge = ageUnits.find(({ unit }) => unit && unit._id.equals(metaUnit.unit._id));
        if (sameUnitInAge) {
          total += sameUnitInAge.powerModifier;
        }
      }
      return total;
    }, 0);
    return { ...metaUnit, totalPowerModifier };
  });

  metaUnitsWithTotalPower.sort((a, b) => b.powerModifier - a.powerModifier || b.totalPowerModifier - a.totalPowerModifier);

  let bestUnit = metaUnitsWithTotalPower[0];
  let bestGoldUnit = metaUnitsWithTotalPower.find(({ unit, totalPowerModifier }) => unit && unit.isGoldUnit && totalPowerModifier === bestUnit.totalPowerModifier);

  if (bestGoldUnit instanceof mongoose.Document) {
    bestGoldUnit = bestGoldUnit.toObject().unit;
  }
  if (bestUnit instanceof mongoose.Document) {
    bestUnit = bestUnit.toObject().unit;
  }

  if (!bestGoldUnit) {
    bestGoldUnit = bestUnit;
  }

  return bestUnit._doc.unit;
}

function oppCompAnalyzer(oppComp) {
  console.log('Opponent Comp Analyzer');
}

function supportUnitPicker(mainUnit, yourAge, oppComp) {
  console.log('Support Unit Picker');
}

function compEvaluator(yourComp, oppComp) {
  console.log('Comp Evaluator');
}

function powerModifierAverage(comp) {
  return comp.reduce((sum, { powerModifier }) => sum + powerModifier, 0) / comp.length;
}

function compChooser(yourCiv, oppCiv, yourAge, oppComp) {
  console.log('Comp Chooser');
}

module.exports = {
  pickBestMainUnit,
  oppCompAnalyzer,
  supportUnitPicker,
  compEvaluator,
  powerModifierAverage,
  compChooser
}