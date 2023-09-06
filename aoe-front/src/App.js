import { useState, useEffect } from 'react'
import civService from './services/civs'
import CivsList from './components/CivsList'
import Guide from './components/analysis/Guide'


const App = () => {
  const [civs, setCivs] = useState([])
  const [page, setPage] = useState('choose')
  const [civ1, setCiv1 ] = useState([])
  const [civ2, setCiv2] = useState([])

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
  }
  
  const showGuide = () => {
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
        <Guide civ1={civ1} civ2={civ2}/>
      }
      
    </div>
  );
}

export default App;


/* {page ==='matchup' && 
      <Matchup civ1={civ1} civ2={civ2}/>}
      <ul>
        {civs.map((c) =>(
          <li key={c} >{c}</li>
        ))}
      </ul> */