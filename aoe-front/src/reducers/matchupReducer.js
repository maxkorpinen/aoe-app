import { createSlice } from "@reduxjs/toolkit"

const matchupSlice = createSlice({
  name: 'matchup',
  initialState: [],
  reducers: {
    setMatchup(state, action) {
      return action.payload
    }
  }
})

export const { setMatchup } = matchupSlice.actions
export default matchupSlice.reducer