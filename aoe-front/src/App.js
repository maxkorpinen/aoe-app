import { useState, useEffect } from 'react'
import civService from './services/civs'
import CivsList from './components/CivsList'

const App = () => {
  const [civs, setCivs] = useState([])

  useEffect(() => {
    civService.getAll().then(civs =>
      setCivs(civs))
  }, [])
  

  return (
    <div>
      <h1>AoE2 app</h1>
      <CivsList/>
      <ul>
        {civs.map((c) =>(
          <li key={c} >{c}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
