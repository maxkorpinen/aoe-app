import { createSlice } from "@reduxjs/toolkit"

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