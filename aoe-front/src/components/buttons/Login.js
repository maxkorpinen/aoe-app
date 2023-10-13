import { useDispatch } from 'react-redux'
import { useState } from 'react'
import loginService from '../../services/login'
import { setError } from '../../reducers/errorReducer'
import { setUser } from '../../reducers/userReducer'
import NewUser from './NewUser'

const Login = ({showLogin, setShowLogin}) => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userInfo = JSON.parse(window.localStorage.getItem('loggedUser'))
  const dispatch = useDispatch()
  let token = ''
  if (userInfo) {
    token = userInfo.token
    return null
  }

  const openLogin = () => {
    setShowLogin(true)
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        password: password,
        username: username
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (excep) {
      dispatch(setError('wrong credentials'))
      setTimeout(() => {
        dispatch(setError(null))
      }, 5000)
    }
  }

  return(
    <>
    { !token && !showLogin &&
      <button onClick={() => openLogin()}>Login or create new user</button>
    }
    { !token && showLogin &&
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value)}/>
          <div>
          password<input
          type="password"
          value={password}
          name="Password"
          onChange={({target})=> setPassword(target.value)}/>
          </div>
        </div>
        <button type="submit">login</button>
      </form>
      <NewUser />
      </>
    }
    </>
  )
}

export default Login