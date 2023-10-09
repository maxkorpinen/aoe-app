import { useSelector } from "react-redux"
import images from "../utils/imageloader"
import CivButton from "./CivButton"
import userService from '../services/users'

const UserInfo = () => {
  const favciv = useSelector(state => state.user.favciv)
  const user = useSelector(state => state.user)
  const imageNames = Object.keys(images.civImages)

  const buttFunc = (civ) => {
    const chosenCiv = civ.split(".")[0]
    let newUserData = {
      username: user.username,
      token: user.token,
      favciv: chosenCiv
    }
    userService.update(newUserData)
  }

  return(
    <div>
      <p>Currently logged in as: {user.username}</p>
      <p>Favourite civilization: {favciv}</p>
      <h4>Click icon to choose favourite civilization</h4>
      {imageNames.map((imgname) => (
        <CivButton
          key={imgname}
          name={imgname}
          image={images.civImages[imgname]}
          buttFunc={buttFunc}/>
      ))}
    </div>
  )
}

export default UserInfo