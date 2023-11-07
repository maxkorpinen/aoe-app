import { createSlice } from "@reduxjs/toolkit"

const pageStatesSlice = createSlice({
  name: 'page',
  initialState: {page:'choose', guide: ''},
  reducers: {
    pageChange(state, action) {
      return {page: action.payload, guide: state.guide}
    },
    guideChange(state, action) {
      return {page: state.page, guide: action.payload}
    }
  }
})
export const { pageChange, guideChange } = pageStatesSlice.actions
export default pageStatesSlice.reducer