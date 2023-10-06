import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pageChange } from './reducers/pageReducer'
import { resetCivs } from './reducers/civReducer'
import { resetPu } from './reducers/powerunitReducer'
import CivsList from './components/CivsList'
import Guide from './components/analysis/Guide'
import f from './utils/helpfuncs'
import Notification from './components/Notification'


const App = () => {
  const civ1 = useSelector(state => state.civs['civ1'])
  const civ2 = useSelector(state => state.civs['civ2'])
  const [guideType, setGuideType] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const isEmpty = f.isEmpty
  const dispatch = useDispatch()
  const storePage = useSelector(state => state.page)

  const beginning = () => {
    dispatch(resetCivs())
    dispatch(resetPu())
    dispatch(pageChange('choose')) 
    setGuideType('')
  }
  
  /*
  tän vois siirtää johonkin container komponenttiin
  */
  const showGuide = () => {
    if(isEmpty(civ1)) {
      setErrorMessage('choose at least one civ')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }
    if(!isEmpty(civ1) && !isEmpty(civ2)) {
      setGuideType('matchup')
    }
    if(!isEmpty(civ1) && isEmpty(civ2)) {
      setGuideType('civguide')
    }
    dispatch(pageChange('guide'))
  }
  

  return (
    <div>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => beginning()}>Start over</button>
        <button onClick={() => showGuide()}>Analyse with chosen specs</button>
      </div>
      <h1>AoE2 app</h1>
      {storePage==='choose' &&
        <CivsList setGuideType={setGuideType} />}
      {storePage ==='guide' &&
        <Guide guideType={guideType} />}
    </div>
  )
}

export default App;
