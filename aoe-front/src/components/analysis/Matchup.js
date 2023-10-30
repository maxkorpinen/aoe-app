import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import UnitBox from './UnitBox'
import CounterBox from './CounterBox'
import images from '../../utils/imageloader'
import hf from '../../utils/helpfuncs'
import unitService from '../../services/units'
import './guide.css'


const Matchup = () => {
  // eslint-disable-next-line no-unused-vars
  const [seenUnit, setSeenUnit] = useState('')
  const [allUnits, setAllUnits] = useState([])
  const civ1 = useSelector(state => state.civs['civ1'])
  const civ2 = useSelector(state => state.civs['civ2'])
  const pu1 = useSelector(state => state.powerunits.pu1)
  const pu2 = useSelector(state => state.powerunits.pu2)
  const civ1wins = useSelector(state => state.stats.civ1wins)
  const civ2wins = useSelector(state => state.stats.civ2wins)

  useEffect(() => {
    unitService.getAll().then(retUnits =>
      setAllUnits(retUnits))
  }, [])

  if([pu1, pu2, civ1, civ2, allUnits].map(a => hf.isEmpty(a)).includes(true)) {
    return
  }
  let p1counters = hf.filterCounters(pu1[0].counters, pu2[0].unit, civ2[0].units[0], allUnits)
  let p2counters = hf.filterCounters(pu2[0].counters, pu1[0].unit, civ1[0].units[0], allUnits)
  console.log(civ1)
  return (
    <div>
      <p>matchup stuff</p>
      {pu2[0] &&
      <div className='boxrows'>
        
        <UnitBox text={'Your core unit: '} unit={pu1[0].unit} 
        imgs={[images.unitImages[pu1[0].unit+'.png']]}
        seenUnit={seenUnit} winpct={civ1wins / (civ1wins+civ2wins)}/>
        <UnitBox text={'Opp core unit: '} unit={pu2[0].unit}
        imgs={[images.unitImages[pu2[0].unit+'.png']]}
        winpct={civ2wins / (civ1wins+civ2wins)}/>
      </div>
      }
      <div className='boxrows'>
        <CounterBox 
          text={"Your supporting units"} 
          pu={pu2} 
          suppUnits={p2counters}
          setSeenUnit={() => {}}/>
        <CounterBox 
          text={"Their supporting units"} 
          pu={pu1}
          suppUnits={p1counters}
          setSeenUnit={() => {}}/>
      </div>
    </div>
  )
}

export default Matchup 