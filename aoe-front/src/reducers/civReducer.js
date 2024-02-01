import { createSlice } from "@reduxjs/toolkit"

/*
User chosen civs
Format:
*/
const civsSlice = createSlice({
  name: 'civs',
  initialState: { 'civ1':[],'civ2':[] },
  reducers: {
    setCiv1(state, action) {
      return { 'civ1': action.payload, 'civ2': state.civ2 }
    },
    setCiv2(state, action) {
      return { 'civ1': state.civ1, civ2: action.payload }
    },
    resetCivs(state, action) {
      return { 'civ1':[],'civ2':[] }
    },
    setCivs(state, action) {
      return { 'civ1': action.payload[0], 'civ2': action.payload[1] }
    }
  }
})

export const { setCiv1, setCiv2, resetCivs, setCivs } = civsSlice.actions
export default civsSlice.reducer