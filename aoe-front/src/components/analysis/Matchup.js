/* import { useSelector } from 'react-redux'
import hf from '../../utils/helpfuncs' */
import CounterBoxesHolder from './CounterBoxesHolder'
import UnitBoxesHolder from './UnitBoxesHolder'
import './guide.css'


const Matchup = () => {
  /* const civ1 = useSelector(state => state.civs['civ1'])
  const civ2 = useSelector(state => state.civs['civ2'])
  const pu1 = useSelector(state => state.powerunits.pu1)
  const pu2 = useSelector(state => state.powerunits.pu2) */

  /* if([pu1, pu2, civ1, civ2].map(a => hf.isEmpty(a)).includes(true)) {
    return
  } */

  return (
    <div>
      <p>matchup stuff</p>
      <UnitBoxesHolder />
      <CounterBoxesHolder/>
    </div>
  )
}

export default Matchup