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
      const items = action.payload || [];

      // keep only valid ids
      state.ids = items
        .map((item) => item?._id)
        .filter(Boolean);
    },

    addFavoriteLocal(state, action) {
      const id = action.payload;

      // 🔴 guard against undefined/null
      if (!id) return;

      if (!state.ids.includes(id)) {
        state.ids.push(id);
      }
    },

    removeFavoriteLocal(state, action) {
      const id = action.payload;

      if (!id) return;

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