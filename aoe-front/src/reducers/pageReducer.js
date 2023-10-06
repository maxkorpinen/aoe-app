import { createSlice } from "@reduxjs/toolkit"

/* const pageReducer = (state = 'choose', action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return action.payload
    default:
      return state
  }
}

export const pageChange = page => {
  return {
    type: 'SET_PAGE',
    payload: page
  }
} */

const pageSlice = createSlice({
  name: 'page',
  initialState: 'choose',
  reducers: {
    pageChange(state, action) {
      return action.payload
    }
  }
})
export const { pageChange } = pageSlice.actions
export default pageSlice.reducer