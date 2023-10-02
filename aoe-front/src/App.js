import { useState, useEffect } from 'react'
import civService from './services/civs'
import unitService from './services/units'
import CivsList from './components/CivsList'
import Guide from './components/analysis/Guide'
import f from './utils/helpfuncs'
import Notification from './components/Notification'


const App = () => {
  const [civs, setCivs] = useState([])
  const [page, setPage] = useState('choose')
  const [civ1, setCiv1 ] = useState([])
  const [civ2, setCiv2] = useState([])
  const [pu1, setPu1] = useState([])
  const [pu2, setPu2] = useState([])
  const [guideType, setGuideType] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const isEmpty = f.isEmpty

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
      console.log("MATCHUP",civ2)
      setGuideType('matchup')
    }
    if(!isEmpty(civ1) && isEmpty(civ2)) {
      console.log("CIVGUIDE")
      setGuideType('civguide')
    }
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
      {page==='choose' &&
      <CivsList changePage={setPage}
        civ1={civ1}
        setCiv1={setCiv1}
        civ2={civ2}
        setCiv2={setCiv2}
        setGuideType={setGuideType}
        setPu1={setPu1}
        setPu2={setPu2}
        pu1={pu1}
        pu2={pu2}/>}
      {page ==='guide' &&
        <Guide civ1={pu1} civ2={pu2} guideType={guideType}/>
      }
      
    </div>
  );
}

export default App;
