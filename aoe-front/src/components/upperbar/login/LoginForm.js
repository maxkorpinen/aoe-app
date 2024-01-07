import { useDispatch } from 'react-redux'
import { useState } from 'react'
import loginService from '../../../services/login'
import { setError } from '../../../reducers/errorReducer'
import { setUser } from '../../../reducers/userReducer'
import { logoutChange } from '../../../reducers/topButtonsReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        password: password,
        username: username
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(logoutChange(true))
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
    <form onSubmit={handleLogin}>
      <div>
          username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}/>
        <div>
          password<input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}/>
        </div>
      </div>
      <button className='upper' type="submit">login</button>
    </form>

  )
}

export default LoginForm