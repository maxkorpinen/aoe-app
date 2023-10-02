import { useState } from 'react'
import UnitBox from './UnitBox'
import CounterBox from './CounterBox'
import './guide.css'
import images from '../../utils/imageloader'

const Matchup = ({civ1, civ2}) => {
  const [seenUnit, setSeenUnit] = useState('')
  let unitname = civ1[0].unit+'.png'
  let unit2name = civ2[0].unit+'.png'
  return (
    <div>
      <p>matchup stuff</p>
      <div className='boxrows'>
        <UnitBox text={'Your core unit: '} unit={civ1[0].unit} 
        imgs={[images.unitImages[unitname]]}
        seenUnit={seenUnit}/>
        <UnitBox text={'Opp core unit: '} unit={civ2[0].unit}
        imgs={[images.unitImages[unit2name]]}
        />
      </div>
      <div className='boxrows'>
        <CounterBox text={"Your supporting units"} civ={civ2} setSeenUnit={() => {}}/>
        <CounterBox text={"Their supporting units"} civ={civ1} setSeenUnit={()=>{}} />
      </div>
    </div>
  )
}

export default Matchup 