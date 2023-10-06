import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import pageReducer, { pageChange } from './reducers/pageReducer'
import civService from './services/civs'
import CivsList from './components/CivsList'
import Guide from './components/analysis/Guide'
import f from './utils/helpfuncs'
import Notification from './components/Notification'


const App = () => {
  const [civ1, setCiv1 ] = useState([])
  const [civ2, setCiv2] = useState([])
  const [pu1, setPu1] = useState([])
  const [pu2, setPu2] = useState([])
  const [guideType, setGuideType] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const isEmpty = f.isEmpty
  const dispatch = useDispatch() // uus
  const storePage = useSelector(state => state.page) //uus

  useEffect(() => {
    civService.getAll().then(civs =>
      setCivs(civs))
  }, [])

  const beginning = () => {
    setCiv1('')
    setCiv2('')
    setPu1([])
    setPu2([])
    setPage('choose')
    dispatch(pageChange('choose')) 
    setGuideType('')
  }
  
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
    dispatch(pageChange('guide')) // uus
    console.log( "Storepage",storePage)
    setPage('guide')
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
      <CivsList
        civ1={civ1}
        setCiv1={setCiv1}
        civ2={civ2}
        setCiv2={setCiv2}
        setGuideType={setGuideType}
        setPu1={setPu1}
        setPu2={setPu2}
        pu1={pu1}
        pu2={pu2}/>}
      {storePage ==='guide' &&
        <Guide pu1={pu1} 
        pu2={pu2} 
        guideType={guideType}
        civ1={civ1}
        civ2={civ2}/>
      }
      
    </div>
  );
}

export default App;
