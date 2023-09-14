const civilizations = require('./civstats')
const units = require('./units')

//Returns units from civ with highest value
const punit = (id) => {
  const civUnits = civilizations.find(c => c.id === id).units[0]
  const punits = Object.entries(civUnits).reduce((ac, cur) => {
    if (ac[0][1]===cur[1]) {
      return ac.concat([cur])
    }
    if (ac[0][1]<cur[1]) {
      return [cur]
    }
    return ac
  }, [['',0]])
  const objektina = Object.fromEntries(punits)
  return objektina
}

const getPowerUnit = (civ) => {
  const civUnits = civ[0].units[0]
  let highestValueUnit = ''
  let highestValue = 0
  for (let unit in civUnits) {
    if (civUnits[unit] > highestValue) {
      highestValue = civUnits[unit]
      highestValueUnit = unit
    }
  }
  return {unit: highestValueUnit, value: highestValue}
}

const isGoldUnit = (unit) => {
  return units.filter(u => u.name === unit)[0].isGoldUnit
}

module.exports = {
  punit,
  getPowerUnit,
  isGoldUnit
}