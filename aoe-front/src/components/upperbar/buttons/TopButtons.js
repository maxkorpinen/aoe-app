import { useDispatch, useSelector } from 'react-redux'
import { pageChange } from '../../../reducers/pageReducer'
import LoginNew from '../login/LoginNew'
import Logout from '../login/Logout'
import About from './AboutButton'
import StartOver from './StartOver'
import './buttons.css'

const TopButtons = () => {
  const showLogout = useSelector(state => state.buttonsState.logout)
  const dispatch = useDispatch()

  return(
    <div className="flex-container">
      <div className='spacer' />
      <StartOver />
      <About />
      <div className='spacer' />
      <div className='spacer' />
      <div className='spacer' />
      <div className='spacer' />
      { !showLogout &&
        <LoginNew />}
      { showLogout &&
        <>
          <button onClick={() => dispatch(pageChange('user'))}>Userinfo</button>
          <Logout/>
        </> }
      <div className='spacer' />
      <div className='spacer' />
    </div>
  )
}

export default TopButtons
