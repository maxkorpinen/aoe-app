import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pageChange } from '../../reducers/pageReducer'
import Login from './Login'
import Logout from './Logout'
import About from './AboutButton'
import StartOver from './StartOver'
import AnalyseButton from './AnalyseButton'

const TopButtons = () => {
  const [showLogin, setShowLogin] = useState(false)
  const showLogout = useSelector(state => state.buttonsState.logout)
  const dispatch = useDispatch()

  return(
    <div>
      <StartOver />
      <AnalyseButton />

      { !showLogout &&
        <Login showLogin={showLogin} setShowLogin={setShowLogin} />
      }
      { showLogout &&
        <>
          <button onClick={() => dispatch(pageChange('user'))}>Userinfo</button>
          <Logout setShowLogin={setShowLogin} />
        </>
      }
      <About />
    </div>
  )
}

export default TopButtons
