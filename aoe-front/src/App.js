import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CivsList from './components/CivsList'
import Guide from './components/analysis/Guide'
import Notification from './components/Notification'
import TopButtons from './components/buttons/TopButtons'
import UserInfo from './components/UserInfo'
import { setUser } from './reducers/userReducer'

const App = () => {
  const [guideType, setGuideType] = useState('')
  const page = useSelector(state => state.page)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log(loggedUserJSON)
    setUser(loggedUserJSON)
  })
  
  return (
    <div>
      <Notification/>
      <TopButtons 
        setGuideType={setGuideType}/>
      <h1>AoE2 app</h1>
      {page==='choose' &&
        <CivsList setGuideType={setGuideType} />}
      {page ==='guide' &&
        <Guide guideType={guideType} />}
      {page === 'user' &&
        <UserInfo />}
    </div>
  )
}

export default App
