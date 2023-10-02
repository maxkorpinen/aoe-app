import { useState } from 'react'
import Matchup from './Matchup'
import CivGuide from './CivGuide'
import images from '../../utils/imageloader'
import UnitBox from './UnitBox'
import CounterBox from './CounterBox'
import './guide.css'

const Guide = ({civ1, civ2, guideType}) => {
  const [seenUnit, setSeenUnit] = useState('')
  let unitname = civ1[0].unit+'.png'
  return(
    <div>
    {guideType==='civguide' &&
      <div className='boxrows'>
        <UnitBox text={'Coreunit: '} unit={civ1[0].unit} 
        imgs={[images.unitImages[unitname]]}
        seenUnit={seenUnit}/>
        <CounterBox civ={civ1}
          setSeenUnit={setSeenUnit}/>
      </div>
    }
    {guideType==='matchup' &&
      <div>
        <Matchup civ1={civ1} civ2={civ2}/>
      </div>
    }
  </div>
  )
}

export default Guide