import { useSelector } from 'react-redux'
import { useState } from 'react'
import images from '../../utils/imageloader'
import UnitBox from './UnitBox'

const UnitBoxesHolder = () => {
  const [seenUnit, setSeenUnit] = useState('')
  const pu1 = useSelector(state => state.powerunits.pu1)
  const pu2 = useSelector(state => state.powerunits.pu2)
  const civ1wins = useSelector(state => state.stats.civ1wins)
  const civ2wins = useSelector(state => state.stats.civ2wins)

  return(
    <>
      {pu2[0] &&
        <div className='boxrows'>
          <UnitBox text={'Your core unit: '} unit={pu1[0].unit}
            imgs={[images.unitImages[pu1[0].unit+'.png']]}
            seenUnit={seenUnit} winpct={civ1wins / (civ1wins+civ2wins)}/>
          <UnitBox text={'Opp core unit: '} unit={pu2[0].unit}
            imgs={[images.unitImages[pu2[0].unit+'.png']]}
            winpct={civ2wins / (civ1wins+civ2wins)}/>
        </div>
      }
    </>
  )
}

export default UnitBoxesHolder