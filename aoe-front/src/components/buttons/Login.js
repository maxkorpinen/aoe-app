import { useState } from 'react'
import NewUser from './NewUser'
import LoginForm from './LoginForm'

const Login = ({showLogin, setShowLogin}) => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
/*   const userInfo = JSON.parse(window.localStorage.getItem('loggedUser'))
  const dispatch = useDispatch() */

  const openLogin = () => {
    setShowLogin(true)
  }

  return(
    <>
      { !showLogin &&
        <button onClick={() => openLogin()}>Login or create new user</button>
      }
      { showLogin &&
      <>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}/>
        <NewUser/>
      </>
      }
    </>
  )
}

export default Login
