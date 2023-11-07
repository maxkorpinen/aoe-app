import { createSlice } from "@reduxjs/toolkit"

const pageStatesSlice = createSlice({
  name: 'page',
  initialState: {page:'choose', guide: '', civsSet:0},
  reducers: {
    pageChange(state, action) {
      return {page: action.payload, 
              guide: state.guide, 
              civsSet: state.civsSet}
    },
    guideChange(state, action) {
      return {page: state.page, 
              guide: action.payload, 
              civsSet: state.civsSet}
    },
    civsSetChange(state, action) {
      return {page: state.page, 
              guide: state.guide, 
              civsSet: action.payload}
    }
  }
})
export const { pageChange, guideChange, civsSetChange } = pageStatesSlice.actions
export default pageStatesSlice.reducer