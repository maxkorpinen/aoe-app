
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

const compEval = (oppComp, playerComp) => {
  const COUNTER_VALUE = 1
  oppComp = normalizeObject(oppComp)
  playerComp = normalizeObject(playerComp)
  console.log(playerComp.map(val => val.powerModifier))
  console.log(oppComp.map(val => val.powerModifier))

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

module.exports = { compEval }