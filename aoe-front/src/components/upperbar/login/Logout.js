import { useDispatch } from 'react-redux'
import { resetUser } from '../../../reducers/userReducer'
import { pageChange } from '../../../reducers/pageReducer'
import { logoutChange } from '../../../reducers/topButtonsReducer'
import { showLoginFormChange } from '../../../reducers/topButtonsReducer'

const Logout = () => {
  const dispatch = useDispatch()
  const userInfo = JSON.parse(window.localStorage.getItem('loggedUser'))
  if (! userInfo) {
    return null
  }
  const logout = () => {
    dispatch(logoutChange(false))
    dispatch(showLoginFormChange(false))
    dispatch(pageChange('choose'))
    window.localStorage.clear()
    dispatch(resetUser())
  }
  /*
  return(
    <button className='upper' onClick={() => logout()}>
      Logout</button>
  )*/
  return null;
}

export default Logout