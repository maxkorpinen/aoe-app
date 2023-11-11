import { useDispatch, useSelector } from "react-redux"
import { setUser } from '../reducers/userReducer'
import CivButtonHolder from "./CivButtonHolder"
import userService from '../services/users'
import { resetCivs } from '../reducers/civReducer'
import { resetPu } from '../reducers/powerunitReducer'
import { pageChange, guideChange, civsSetChange } from '../reducers/pageReducer'
import { resetUser } from "../reducers/userReducer"
import { logoutChange } from "../reducers/topButtonsReducer"
import { setError } from '../reducers/errorReducer'

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

  const delUser = async () => {
    const userdata = JSON.parse(window.localStorage.getItem('loggedUser'))
    const res = await userService.deleteUser(userdata)
    if (res.status === 204) {
      //resetoidaan sivu
      dispatch(resetCivs())
      dispatch(resetPu())
      dispatch(pageChange('choose'))
      dispatch(guideChange(''))
      dispatch(civsSetChange(0))

      //resetoidaan käyttäjädata
      window.localStorage.clear()
      dispatch(logoutChange(false))
      dispatch(resetUser())
      // setShowLogin(false) -> tää sliceen

      dispatch(setError(`User ${userdata.username} deleted`))
      setTimeout(() => {
        dispatch(setError(null))
      }, 5000)
    } else {
      dispatch(setError(`Error occured while attempting to delete ${userdata.username}`))
      setTimeout(() => {
        dispatch(setError(null))
      }, 5000)
    }
  }

  return(
    <div>
      <button onClick={() => delUser()}>Delete user</button>
      <p>Currently logged in as: {user.username}</p>
      <p>Favourite civilization: {user.favciv}</p>
      <h4>Click icon to choose favourite civilization</h4>
      <CivButtonHolder f={buttFunc} />
    </div>
  )
}

export default UserInfo