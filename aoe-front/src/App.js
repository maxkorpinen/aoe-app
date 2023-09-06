import { useState, useEffect } from 'react'
import civService from './services/civs'
import CivsList from './components/CivsList'
import Guide from './components/analysis/Guide'
import f from './utils/helpfuncs'


const App = () => {
  const [civs, setCivs] = useState([])
  const [page, setPage] = useState('choose')
  const [civ1, setCiv1 ] = useState([])
  const [civ2, setCiv2] = useState([])
  const [guideType, setGuideType] = useState('')

  useEffect(() => {
    civService.getAll().then(civs =>
      setCivs(civs))
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
    if(!f.isEmpty(civ1) && !f.isEmpty(civ2)) {
      console.log("MATCHUP",civ2)
      setGuideType('matchup')
    }
    if(!f.isEmpty(civ1) && f.isEmpty(civ2)) {
      console.log("CIVGUIDE")
      setGuideType('civguide')
    }
    setPage('guide')
  }

  return (
    <div>
      <div>
        <button onClick={() => beginning()}>Start over</button>
        <button onClick={() => showGuide()}>Analyse with chosen specs</button>
      </div>
      <h1>AoE2 app</h1>
      {page==='choose' &&
      <CivsList changePage={changePage}
        civ1={civ1}
        setCiv1={setCiv1}
        civ2={civ2}
        setCiv2={setCiv2}/>}
      {page ==='guide' &&
        <Guide civ1={civ1} civ2={civ2} guideType={guideType}/>
      }
      
    </div>
  );
}

export default App;
