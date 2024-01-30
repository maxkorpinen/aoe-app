import { createSlice } from "@reduxjs/toolkit"

const allCivsSlice = createSlice({
  name: 'allCivs',
  initialState: [],
  reducers: {
    setAllCivs(state, action) {
      return action.payload
    }
  }
})

export const { setAllCivs } = allCivsSlice.actions
export default allCivsSlice.reducer