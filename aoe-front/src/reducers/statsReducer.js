import { createSlice } from '@reduxjs/toolkit'

const statsSlice = createSlice({
  name: 'stats',
  initialState: { civ1wins:0, civ2wins: 0 },
  reducers: {
    setCiv1Wins(state, action) {
      return { civ1wins: action.payload, civ2wins:state.civ2wins }
    },
    setCiv2Wins(state, action) {
      return { civ1wins: state.civ1wins , civ2wins: action.payload }
    },
    setStats(state, action) {
      return action.payload
    }
  }
})

export const { setCiv1Wins, setCiv2Wins, setStats } = statsSlice.actions
export default statsSlice.reducer