import { createSlice } from "@reduxjs/toolkit"

const powerunitSlice = createSlice({
  name: 'powerunits',
  initialState: { 'pu1': [], 'pu2': [] },
  reducers: {
    setPu1(state, action) {
      return { 'pu1':action.payload, 'pu2': state.pu2 }
    },
    setPu2(state, action) {
      return { 'pu1': state.pu1, 'pu2': action.payload }
    },
    resetPu(state, action) {
      return { 'pu1': [], 'pu2': [] }
    }
  }
})

export const { setPu1, setPu2, resetPu } = powerunitSlice.actions
export default powerunitSlice.reducer