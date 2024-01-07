import { useState } from 'react'
import { useDispatch } from 'react-redux'
import userService from '../../../services/users'
import { setError } from '../../../reducers/errorReducer'

const NewUser = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    userService.create(username, password, dispatch)
      .then(res => {
        setUsername('')
        setPassword('')
        dispatch(setError(`New user ${res.username}`))
        setTimeout(() => {
          dispatch(setError(null))
        }, 5000)
      })
      .catch(err => {
        dispatch(setError(err.response.data.error))
        setTimeout(() => {
          dispatch(setError(null))
        }, 5000)
      })
  }

  return(
    <form onSubmit={handleSubmit}>
      <p>Create new user</p>
      <div>
				username
        <input
          type='text'
          value = {username}
          name = 'Username'
          onChange={({ target }) => setUsername(target.value)}/>
        <div>
					password<input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
      </div>
      <button className='upper' type='submit'>create user</button>
    </form>
  )
}

export default NewUser