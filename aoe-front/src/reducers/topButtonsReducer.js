import { createSlice } from "@reduxjs/toolkit"

//Kontrolloi sivun yläreunan nappuloitten näkyvyyttä
const topButtonsSlice = createSlice({
  name: 'topbuttons',
  initialState: { logout: false, showLoginForm: false },
  reducers: {
    logoutChange(state, action) {
      return{
        logout: action.payload,
        showLoginForm: state.showLoginForm
      }
    },
    showLoginFormChange(state, action) {
      return{
        logout: state.logout,
        showLoginForm: action.payload
      }
    }
  }
})

export const { logoutChange, showLoginFormChange } = topButtonsSlice.actions
export default topButtonsSlice.reducer