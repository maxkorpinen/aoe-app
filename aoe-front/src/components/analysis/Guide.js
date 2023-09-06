import Matchup from './Matchup'
import CivGuide from './CivGuide'
import images from '../../utils/imageloader'
import BuildOrderBox from './BuildOrderBox'
import CounterBox from './CounterBox'
import './guide.css'

const Guide = ({civ1, civ2}) => {
  //console.log(civ1[0].civ, civ1[0].unit)
  let unitname = civ1[0].unit+'.png'
  console.log("unitname ",unitname)
  console.log(images.unitImages)
  console.log(images.unitImages.unitname)
  return(
    <div className='boxrows'>
      <BuildOrderBox unit={civ1[0].unit} 
      img={images.unitImages[unitname]}/>
      <CounterBox/>
    </div>
  )
}

export default Guide