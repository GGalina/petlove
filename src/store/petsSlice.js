import { createSlice } from "@reduxjs/toolkit";

const petsSlice = createSlice({
  name: "pets",
  initialState: {
    items: [],
  },

  reducers: {
    setPets(state, action) {
      state.items = action.payload;
    },

    removePet(state, action) {
      state.items = state.items.filter(
        (pet) => pet._id !== action.payload
      );
    },

    clearPets(state) {
      state.items = [];
    },
  },
});

export const {
  setPets,
  removePet,
  clearPets,
} = petsSlice.actions;

export default petsSlice.reducer;