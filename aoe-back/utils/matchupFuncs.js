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

function compEvaluator(playerComp, oppComp) {
  const COUNTER_VALUE = 1
  oppComp = normalizeObject(oppComp)
  playerComp = normalizeObject(playerComp)

  var playerPowerAvg = playerComp.reduce(
    (sum, item) => sum + item.powerModifier, 0) / playerComp.length
  var oppPowerTotalAvg = oppComp.reduce(
    (sum, item) => sum+item.powerModifier,0) / oppComp.length
  
  const oppUnitIds = oppComp.map(x => x._id)
  const playerUnitIds = playerComp.map(x => x._id)

  var oppCounterMentions = 0
  oppComp.forEach(oppUnit => {
    var intersect = playerUnitIds.filter(pUnitId => oppUnit.counterOf.includes(pUnitId))
    oppCounterMentions += intersect.length
  })
  var playerCounterMentions = 0
  playerComp.forEach(plrUnit => {
    var intersect = oppUnitIds.filter(oUnitId => plrUnit.counterOf.includes(oUnitId))
    playerCounterMentions += intersect.length
  })

  var playerPower = playerPowerAvg - (oppCounterMentions*COUNTER_VALUE)
  var oppPower = oppPowerTotalAvg - (playerCounterMentions*COUNTER_VALUE)

  return {playerPower: playerPower, oppPower: oppPower}
}

function powerModifierAverage(comp) {
  return comp.reduce((sum, { powerModifier }) => sum + powerModifier, 0) / comp.length;
}

function compChooser(yourCiv, oppCiv, yourAge, oppComp) {
  console.log('Comp Chooser');
}

const normalizeObject = (obj) => {
  //object occasionally have substructure where data is behind "unit" key, this should remove it if it exists
  //and adds the powermodifier which exists outside the body
  const normalizedObj = obj.map(item => {
    if (item && item.unit) {
      item.unit.powerModifier = item.powerModifier
      item.unit['powerModifier'] = item.powerModifier
      return item.unit;
    }
    return item;
  }).filter(item => item !== undefined)
  return normalizedObj
}

module.exports = {
  pickBestMainUnit,
  oppCompAnalyzer,
  supportUnitPicker,
  compEvaluator,
  powerModifierAverage,
  compChooser
}