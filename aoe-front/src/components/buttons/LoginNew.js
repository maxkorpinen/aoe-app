import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoginFormChange } from '../../reducers/topButtonsReducer'
import NewUser from './NewUser'
import LoginForm from './LoginForm'


const LoginNew = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const showLoginForm = useSelector(state => state.buttonsState.showLoginForm)
  const dispatch = useDispatch()

  const openLogin = () => {
    dispatch(showLoginFormChange(true))
  }

  return(
    <>
      { !showLoginForm &&
        <button onClick={() => openLogin()}>Login or create new user</button>
      }
      { showLoginForm &&
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

export default LoginNew
