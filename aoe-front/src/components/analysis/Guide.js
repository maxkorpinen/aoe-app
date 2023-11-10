import { useSelector } from 'react-redux'
import Matchup from './Matchup'
import CivGuide from './CivGuide'
import './guide.css'

const Guide = () => {
  const guideType = useSelector(state => state.pageState.guide)
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