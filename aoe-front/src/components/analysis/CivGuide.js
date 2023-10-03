import { useState } from 'react'
import UnitBox from './UnitBox'
import CounterBox from './CounterBox'
import images from '../../utils/imageloader'
import './guide.css'

const CivGuide= ({pu1}) => {
  const [seenUnit, setSeenUnit] = useState('')
  console.log("counters",pu1[0].counters)
  let unitname = pu1[0].unit+'.png'
  return (
    <div className='boxrows'>
      <UnitBox text={'Coreunit: '}
      unit={pu1[0].unit}
      imgs={[images.unitImages[unitname]]}
      seenUnit={seenUnit}
      />
      <CounterBox
      civ={pu1}
      text={"Counters to your powerunit"}
      suppUnits={pu1[0].counters}
      setSeenUnit={setSeenUnit}/>
    </div>
)}

export default CivGuide