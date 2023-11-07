import { useDispatch} from 'react-redux'
import { resetUser } from '../../reducers/userReducer'
import { pageChange } from '../../reducers/pageReducer'
import { logoutChange } from '../../reducers/topButtonsReducer'

const Logout = ({setShowLogin}) => {
  const dispatch = useDispatch()
  const userInfo = JSON.parse(window.localStorage.getItem('loggedUser'))
  if (! userInfo) {
    return null
  }
  const logout = () => {
    dispatch(logoutChange(false))
    setShowLogin(false)
    dispatch(pageChange('choose'))
    window.localStorage.clear()
    dispatch(resetUser())
  }

  return(
    <button onClick={() => logout()}>
      Logout</button>
  )
}

export default Logout