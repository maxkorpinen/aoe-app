import { useState, useEffect } from 'react'
import matchService from '../../services/matches'

const AboutPage = () => {
  const [version, setVersion] = useState('')
  useEffect(() => {
    matchService.getVersion().then((ver) => {
      setVersion(ver.version)
    })
  }, [])
  if(!version) {
    return null
  }
  return(
    <div>
      <a href="https://aoestats.io/api-info/">Civ winpct stats gathered from here</a>
      <p>{version}</p>
    </div>
  )
}

export default AboutPage