import { createSlice } from "@reduxjs/toolkit"


const civsSlice = createSlice({
  name: 'civs',
  initialState: {'civ1':[],'civ2':[]},
  reducers: {
    setCiv1(state, action) {
      return {'civ1': action.payload, 'civ2': state.civ2}
    },
    setCiv2(state, action) {
      return {'civ1': state.civ1, civ2: action.payload}
    }
  }
})

export const {setCiv1, setCiv2} = civsSlice.actions
export default civsSlice.reducer