import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLoginFormChange } from '../../../reducers/topButtonsReducer'
import Dropdown from '../buttons/dropDown'


const LoginNew = () => {
  const showLoginForm = useSelector(state => state.buttonsState.showLoginForm)
  const dispatch = useDispatch()

  const openLogin = () => {
    dispatch(showLoginFormChange(true))
  }

  return(
    <>
      { !showLoginForm &&
        <button className='upper' onClick={() => openLogin()}>Login or create new user</button>
      }
      { showLoginForm &&
      <>
        <Dropdown/>
      </>
      }
    </>
  )
}

export default LoginNew
