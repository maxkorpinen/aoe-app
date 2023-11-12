import { useDispatch, useSelector } from 'react-redux'
import { pageChange } from '../../reducers/pageReducer'
import Login from './Login'
import Logout from './Logout'
import About from './AboutButton'
import StartOver from './StartOver'
import AnalyseButton from './AnalyseButton'

const TopButtons = () => {
  const showLogout = useSelector(state => state.buttonsState.logout)
  const dispatch = useDispatch()

  return(
    <div>
      <StartOver />
      <AnalyseButton />
      { !showLogout &&
        <Login />}
      { showLogout &&
        <>
          <button onClick={() => dispatch(pageChange('user'))}>Userinfo</button>
          <Logout/>
        </> }
      <About />
    </div>
  )
}

export default TopButtons
