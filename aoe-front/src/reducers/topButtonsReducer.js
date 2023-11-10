import { createSlice } from "@reduxjs/toolkit"

//Kontrolloi sivun yläreunan nappuloitten näkyvyyttä
const topButtonsSlice = createSlice({
  name: 'topbuttons',
  initialState: { logout: false },
  reducers: {
    logoutChange(state, action) {
      return{
        logout: action.payload
      }
    }
  }
})

export const { logoutChange } = topButtonsSlice.actions
export default topButtonsSlice.reducer