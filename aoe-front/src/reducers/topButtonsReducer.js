import { createSlice } from "@reduxjs/toolkit"

//Kontrolloi sivun yläreunan nappuloitten näkyvyyttä
const topButtonsSlice = createSlice({
  name: 'topbuttons',
  initialState: { logout: false, showLogin: false },
  reducers: {
    logoutChange(state, action) {
      return{
        logout: action.payload,
        showLogin: state.showLogin
      }
    },
    showLoginChange(state, action) {
      return{
        logout: state.logout,
        showLogin: action.payload
      }
    }
  }
})

export const { logoutChange, showLoginChange } = topButtonsSlice.actions
export default topButtonsSlice.reducer