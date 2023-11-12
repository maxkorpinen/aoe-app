import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoginChange } from '../../reducers/topButtonsReducer'
import NewUser from './NewUser'
import LoginForm from './LoginForm'


const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const showLogin = useSelector(state => state.buttonsState.showLogin)
  const dispatch = useDispatch()

  const openLogin = () => {
    dispatch(showLoginChange(true))
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
