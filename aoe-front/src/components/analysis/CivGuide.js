import { useState } from 'react'
import { useSelector } from 'react-redux'
import UnitBox from './UnitBox'
import CounterBox from './CounterBox'
import images from '../../utils/imageloader'
import './guide.css'

const CivGuide= () => {
  const [seenUnit, setSeenUnit] = useState('')
  const pu1 = useSelector(state => state.powerunits.pu1)

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