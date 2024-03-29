import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './components/upperbar/Notification'
import TopButtons from './components/upperbar/buttons/TopButtons'
import { setUser } from './reducers/userReducer'
import { setAllCivs } from './reducers/allCivsReducer'
import PageChooser from './components/PageChooser'
import civService from './services/civs'
import unitService from './services/units';
import { setAllUnits } from './reducers/allUnitsReducer';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
    dispatch(setUser(loggedUserJSON))
  }, [])

  useEffect(() => {
    civService.getAll().then( res => {
      console.log("CIVS LOADED & READY")
      dispatch(setAllCivs(res))
    })
  }, [])

  useEffect(() => {
    unitService.getAll().then(res => {
      console.log("UNITS LOADED & READY")
      dispatch(setAllUnits(res))
    })
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