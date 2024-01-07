import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './components/upperbar/Notification'
import TopButtons from './components/upperbar/buttons/TopButtons'
import { setUser } from './reducers/userReducer'
import PageChooser from './components/PageChooser'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
    dispatch(setUser(loggedUserJSON))
  }, [])

  return (
    <div>
      <Notification/>
      <h1>App of Empires</h1>
      <TopButtons />
      <PageChooser />
    </div>
  )
}

export default App