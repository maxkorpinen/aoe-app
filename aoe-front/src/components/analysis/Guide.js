import { useState } from 'react'
import Matchup from './Matchup'
import CivGuide from './CivGuide'
import images from '../../utils/imageloader'
import UnitBox from './UnitBox'
import CounterBox from './CounterBox'
import {useSelector} from 'react-redux'
import './guide.css'

const Guide = ({guideType}) => {
  return(
    <div>
    {guideType==='civguide' &&
      <div className='boxrows'>
        <CivGuide/>
      </div>
    }
    {guideType==='matchup' && 
      <div>
        <Matchup/>
      </div>
    }
  </div>
  )
}

export default Guide