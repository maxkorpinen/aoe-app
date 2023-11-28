import { useSelector } from "react-redux"
import './notif.css'

const Notification = () => {
  const errorMessage = useSelector(state => state.errorMessage)

  if (errorMessage === null) {
    return null
  }

  return (
    <div className="error">
      {errorMessage}
    </div>
  )
}

export default Notification