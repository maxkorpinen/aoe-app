import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CivsList from './components/CivsList'
import Guide from './components/analysis/Guide'
import Notification from './components/Notification'
import TopButtons from './components/TopButtons'

const App = () => {
  const [guideType, setGuideType] = useState('')
  const storePage = useSelector(state => state.page)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    //tallenna uuseriin jos tarve?
  })
  
  return (
    <div>
      <Notification/>
      <TopButtons 
        setGuideType={setGuideType}/>
      <h1>AoE2 app</h1>
      {storePage==='choose' &&
        <CivsList setGuideType={setGuideType} />}
      {storePage ==='guide' &&
        <Guide guideType={guideType} />}
    </div>
  )
}

export default App
