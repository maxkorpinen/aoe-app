import { useState, useEffect } from 'react'
import civService from './services/civs'

const App = () => {
  const [civs, setCivs] = useState([])

  useEffect(() => {
    civService.getAll().then(civs =>
      setCivs(civs))
  }, [])
  
  console.log("NODE ENV:",process.env.NODE_ENV)

  return (
    <div>
      <h1>AoE2 app</h1>
      <div>
        {civs.map((c) =>(
          <p>{c}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
