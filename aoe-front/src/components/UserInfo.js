import { useSelector } from "react-redux"
import images from "../utils/imageloader"
import CivButton from "./CivButton"


const UserInfo = () => {
  const favciv = useSelector(state => state.user.favciv)
  const user = useSelector(state => state.user.username)
  const imageNames = Object.keys(images.civImages)

  const buttFunc = (civ) => {
    const chosenCiv = civ.split(".")[0]
  }

  return(
    <div>
      <p>Currently logged in as: {user}</p>
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