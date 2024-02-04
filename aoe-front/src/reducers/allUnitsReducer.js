import { createSlice } from "@reduxjs/toolkit"

const allUnitsSlice = createSlice({
  name: 'allUnits',
  initialState: [],
  reducers: {
    setAllUnits(state, action) {
      return action.payload
    }
  }
})

export const { setAllUnits } = allUnitsSlice.actions
export default allUnitsSlice.reducer