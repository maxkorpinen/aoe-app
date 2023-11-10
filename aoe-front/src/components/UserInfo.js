import { useDispatch, useSelector } from "react-redux"
import { setUser } from '../reducers/userReducer'
import CivButtonHolder from "./CivButtonHolder"
import userService from '../services/users'

const UserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const buttFunc = (civ) => {
    const chosenCiv = civ.split(".")[0]
    const userdata = JSON.parse(window.localStorage.getItem('loggedUser'))
    let newUserData = {
      username: userdata.username,
      token: userdata.token,
      favciv: chosenCiv
    }
    userService.update(newUserData, dispatch)
    dispatch(setUser({ username:newUserData.username,token:newUserData.token,favciv:chosenCiv }))
  }

  return(
    <div>
      <p>Currently logged in as: {user.username}</p>
      <p>Favourite civilization: {user.favciv}</p>
      <h4>Click icon to choose favourite civilization</h4>
      <CivButtonHolder f={buttFunc} />
    </div>
  )
}

export default UserInfo