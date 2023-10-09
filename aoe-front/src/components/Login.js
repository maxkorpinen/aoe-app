import { useSelector} from 'react-redux'
import { useState } from 'react'
import loginService from '../services/login'
/*
Jos token on olemassa niin älä näytä login vaa njoku username tms
*/

const Login = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const token = useSelector(state => state.token)

  const openLogin = () => {
    setShowLogin(true)
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const token = await loginService.login({
        password: password,
        username: username
      })
      setUsername('')
      setPassword('')
    } catch (excep) {
      console.log(excep)
    }
  }

  return(
    <div>
    { !token && !showLogin &&
      <button onClick={() => openLogin()}>Login</button>
    }
    { !token && showLogin &&
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
    }
    { token &&
      <p>sisäänkirjautunut</p>
    }
    </div>
  )
}

export default Login