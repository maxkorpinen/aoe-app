import { useState } from 'react'
import userService from '../../services/users'

const NewUser = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
		console.log(username, password)
		const res = await userService.create(username, password)
    console.log(res)
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
				onChange={({target})=>setUsername(target.value)}/>
				<div>
					password<input
					type="password"
					value={password}
					name="Password"
					onChange={({target})=>setPassword(target.value)}
					/>
				</div>
			</div>
			<button type='submit'>create user</button>
		</form>
	)
}

export default NewUser