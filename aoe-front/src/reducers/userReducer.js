import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: 'user',
  initialState: {user:'', token: '', favciv:''},
  reducers: {
    setUser(state, action) {
        return action.payload
    },
    resetUser(state, action) {
      return {user:'', token: '', favciv:''}
    }
  }
})

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer