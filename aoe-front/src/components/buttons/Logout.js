import { useDispatch} from 'react-redux'
import { resetUser } from '../../reducers/userReducer'
import { pageChange } from '../../reducers/pageReducer'

const Logout = ({setShowLogin}) => {
  const dispatch = useDispatch()
  const userInfo = JSON.parse(window.localStorage.getItem('loggedUser'))


  if (! userInfo) {
    return null
  }
  const logout = () => {
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