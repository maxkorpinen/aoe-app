import { useState, useEffect } from 'react'
import UnitBox from './UnitBox'
import CounterBox from './CounterBox'
import './guide.css'
import images from '../../utils/imageloader'
import hf from '../../utils/helpfuncs' //eslint valittaa 
import unitService from '../../services/units'


const Matchup = ({pu1, pu2, civ1, civ2}) => {
  const [seenUnit, setSeenUnit] = useState('')
  const [allUnits, setAllUnits] = useState([])
  useEffect(() => {
    unitService.getAll().then(retUnits =>
      setAllUnits(retUnits))

  }, [])

  if([pu1, pu2, civ1, civ2, allUnits].map(a => hf.isEmpty(a)).includes(true)) {
    return
  }
  let p1counters = hf.filterCounters(pu1[0].counters, pu2[0].unit, civ2[0].units[0], allUnits)
  let p2counters = hf.filterCounters(pu2[0].counters, pu1[0].unit, civ1[0].units[0], allUnits)
  return (
    <div>
      <p>matchup stuff</p>
      {pu2[0] &&
      <div className='boxrows'>
        <UnitBox text={'Your core unit: '} unit={pu1[0].unit} 
        imgs={[images.unitImages[pu1[0].unit+'.png']]}
        seenUnit={seenUnit}/>
        <UnitBox text={'Opp core unit: '} unit={pu2[0].unit}
        imgs={[images.unitImages[pu2[0].unit+'.png']]}
        />
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