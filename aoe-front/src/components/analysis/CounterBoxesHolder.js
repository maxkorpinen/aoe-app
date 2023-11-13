import { useSelector } from 'react-redux'
import hf from '../../utils/helpfuncs'
import CounterBox from './CounterBox'

const CounterBoxesHolder = () => {
  const pu1 = useSelector(state => state.powerunits.pu1)
  const pu2 = useSelector(state => state.powerunits.pu2)
  const civ1 = useSelector(state => state.civs['civ1'])
  const civ2 = useSelector(state => state.civs['civ2'])
  let p1counters = hf.filterCounters(pu1[0].counters, pu2[0].unit, civ2[0].units[0])
  let p2counters = hf.filterCounters(pu2[0].counters, pu1[0].unit, civ1[0].units[0])

  if([pu1, pu2, civ1, civ2].map(a => hf.isEmpty(a)).includes(true)) {
    return
  }

  return(
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
  )
}

export default CounterBoxesHolder