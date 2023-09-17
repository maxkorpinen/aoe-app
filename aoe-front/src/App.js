import { useState, useEffect } from 'react'
import civService from './services/civs'
import unitService from './services/units'
import CivsList from './components/CivsList'
import Guide from './components/analysis/Guide'
import f from './utils/helpfuncs'
import Notification from './components/Notification'


const App = () => {
  const [civs, setCivs] = useState([])
  const [units, setUnits] = useState([])
  const [page, setPage] = useState('choose')
  const [civ1, setCiv1 ] = useState([])
  const [civ2, setCiv2] = useState([])
  const [guideType, setGuideType] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const isEmpty = f.isEmpty

  useEffect(() => {
    civService.getAll().then(civs =>
      setCivs(civs))
  }, [])

  useEffect(() => {
    unitService.getAll().then(unitss => 
      console.log(unitss)
      /* setUnits(unitss) */)
  }, [])
  
  const changePage = ({page}) => {
    console.log("CHANGE PAGE TO: ",page)
    console.log("civ1:",civ1, "civ2:", civ2)
    setPage(page)
  }

  const beginning = () => {
    setCiv1('')
    setCiv2('')
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
      {units && 
       units.map((u) => (
        <p>{u}</p>
       ))
       }
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
        setGuideType={setGuideType}/>}
      {page ==='guide' &&
        <Guide civ1={civ1} civ2={civ2} guideType={guideType}/>
      }
      
    </div>
  );
}

export default App;
