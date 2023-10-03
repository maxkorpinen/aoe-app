import { useState } from 'react'
import Matchup from './Matchup'
import CivGuide from './CivGuide'
import images from '../../utils/imageloader'
import UnitBox from './UnitBox'
import CounterBox from './CounterBox'
import './guide.css'
import hf from '../../utils/helpfuncs' //eslint valittaa 

const Guide = ({pu1, pu2, guideType, civ1, civ2}) => {
  const [seenUnit, setSeenUnit] = useState('')
  //return, jos statteihin ei ole asetettu vielä mitään
  if([pu1,pu2,civ1,civ2].map(a => hf.isEmpty(a)).includes(true)) {
    return
  }
  let unitname = pu1[0].unit+'.png'
  return(
    <div>
    {guideType==='civguide' &&
      <div className='boxrows'>
        <UnitBox text={'Coreunit: '} unit={pu1[0].unit} 
        imgs={[images.unitImages[unitname]]}
        seenUnit={seenUnit}/>
        <CounterBox civ={pu1}
          setSeenUnit={setSeenUnit}/>
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