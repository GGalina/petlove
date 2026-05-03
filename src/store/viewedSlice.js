import { createSlice } from "@reduxjs/toolkit";

const viewedSlice = createSlice({
  name: "viewed",
  initialState: {
    items: [],
  },
  reducers: {
    setViewed(state, action) {
      state.items = action.payload;
    },
    clearViewed(state) {
      state.items = [];
    },
  },
});

export const { setViewed, clearViewed } = viewedSlice.actions;
export default viewedSlice.reducer;