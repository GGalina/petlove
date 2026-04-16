import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ids: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,

  reducers: {
    setFavorites(state, action) {
      state.ids = (action.payload || []).map((item) => item._id);
    },

    addFavoriteLocal(state, action) {
      const id = action.payload;
      if (!state.ids.includes(id)) {
        state.ids.push(id);
      }
    },

    removeFavoriteLocal(state, action) {
      const id = action.payload;
      state.ids = state.ids.filter((item) => item !== id);
    },

    clearFavorites(state) {
      state.ids = [];
      state.error = null;
    },
  },
});

export const {
  setFavorites,
  addFavoriteLocal,
  removeFavoriteLocal,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;