/* import { useState, useEffect } from 'react'
//import civService from './services/civs'

const Matchup = ({civ1, civ2}) => {
  const [matchup, setMatchup] = useState('')

  useEffect(() => {
    civService.getAll().then(civs =>
      setCivs(civs))
  }, [])

  return (
    <div>
      <p>matchup stuff</p>
      <p>{civ1} vs {civ2}</p>
    </div>
  )
}

export default Matchup */