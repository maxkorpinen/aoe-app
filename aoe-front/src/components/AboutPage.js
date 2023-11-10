import { useState, useEffect } from 'react'
import matchService from '../services/matches'

const AboutPage = () => {
  const [version, setVersion] = useState('')
  useEffect(() => {
    matchService.getVersion().then((ver) => {
      console.log("app ver:", ver)
      setVersion(ver.version)
    })
  }, [])
  if(!version) {
    return null
  }
  return(
    <p>{version}</p>
  )
}

export default AboutPage