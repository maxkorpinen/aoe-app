const civilizations = require('./civstats')

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

module.exports = {
  punit
}