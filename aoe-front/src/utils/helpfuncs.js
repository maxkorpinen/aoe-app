const isEmpty = (object) => {
  if ( object == null) {
    return true
  }
  return Object.keys(object).length===0
}

//counters: all counters to civ a's powerunit
//punit: civ b's powerunit
//civUnits: civ b's all available units
const filterCounters = (counters, punit, civUnits) => {
  //remove powerunit from possible supporting units
  let ret = counters.filter((el) => !(el===punit)) 
  //remove non-buildable units from possible supporting units
  ret = ret.filter(unit => !(civUnits[unit] === null))
  return ret
}

export default {isEmpty, filterCounters}