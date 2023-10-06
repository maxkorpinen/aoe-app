import { useState } from 'react'
import Matchup from './Matchup'
import CivGuide from './CivGuide'
import images from '../../utils/imageloader'
import UnitBox from './UnitBox'
import CounterBox from './CounterBox'
import {useSelector} from 'react-redux'
import './guide.css'

const Guide = ({pu1, pu2, guideType}) => { //, civ1, civ2
  const civ1 = useSelector(state => state.civs['civ1'])
  const civ2 = useSelector(state => state.civs['civ2'])
  return(
    <div>
    {guideType==='civguide' &&
      <div className='boxrows'>
        <CivGuide pu1={pu1}/>
      </div>
    }
    {guideType==='matchup' && 
      <div>
        <Matchup pu1={pu1} 
        pu2={pu2}
        civ1={civ1}
        civ2={civ2}/>
      </div>
    }
  </div>
  )
}

export default Guide