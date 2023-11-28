import { useDispatch, useSelector } from 'react-redux'
import { pageChange } from '../../../reducers/pageReducer'
import LoginNew from '../login/LoginNew'
import Logout from '../login/Logout'
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
        <LoginNew />}
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
