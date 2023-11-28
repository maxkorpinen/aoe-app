import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoginFormChange } from '../../../reducers/topButtonsReducer'
import NewUser from './NewUser'
import LoginForm from './LoginForm'


const LoginNew = () => {
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
        <LoginForm/>
        <NewUser/>
      </>
      }
    </>
  )
}

export default LoginNew
