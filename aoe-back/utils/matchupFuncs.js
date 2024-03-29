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

function supportUnitPicker(mainUnit, yourAge, oppComp, yourCiv) {
  const SUPP_UNIT_COUNTERS_F = 1 //Factor for: how many opposing units player support unit counters
  const OPPONENT_COUNTERS_TO_SUPP_F = 0.5 //How many opposing units counter players support unit
  //normalize & filter for non-gold  units
  const availableUnits = yourCiv.units[yourAge]
  var normalized = normalizeObject(availableUnits)
  var nfSupp = normalized.filter(u => !u.isGoldUnit)

  //If oppComp has gold units, check only those first, later check 
  //non goldunits for lower value
  const oppCompN = normalizeObject(oppComp)
  const oppGolds = oppCompN.filter(u => u.isGoldUnit)
  const relevantOpp = oppGolds.length > 0
  ? oppGolds
  : oppCompN
  
  //how many opp units possible support units counter
  const counteredByComb = relevantOpp.reduce(
    (acc, curr) => acc.concat(curr.counteredBy), []
  )
  var supCandidates = []
  nfSupp.forEach(sup => {
    const id = sup._id.toString()
    const counterInstances = counteredByComb.filter(
      u => u === id
    ).length
    var supc = sup
    supc['goldCounterInstances'] = counterInstances
    supCandidates.push(supc)
  })

  const ret1 = supCandidates.reduce((acc, curr) => {
    return (acc.goldCounterInstances > curr.goldCounterInstances) ? acc : curr;
  })
  
  //how many opponent units counter your possible support unit
  //based on all opponent units
  const countersOfComb = oppCompN.reduce(
    (acc, curr) => acc.concat(curr.countersOf), []
  )
  var supCandidates2 = supCandidates
  supCandidates.forEach(sup => {
    const id = sup._id.toString()
    const counterInstances = countersOfComb.filter(
      u => u === id
    ).length
    var supc = sup
    supc['opponentCountersCount'] = counterInstances
    supCandidates2.push(supc)
    console.log(counterInstances, sup.name)
  })
  const ret2 = supCandidates.reduce((acc, curr) => {
    return (acc.goldCounterInstances*SUPP_UNIT_COUNTERS_F+(acc.opponentCountersCount*OPPONENT_COUNTERS_TO_SUPP_F) > 
          curr.goldCounterInstances*SUPP_UNIT_COUNTERS_F+(curr.opponentCountersCount*OPPONENT_COUNTERS_TO_SUPP_F)) ? acc : curr;
  })
  return ret2
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