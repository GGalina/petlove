import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToFavorite,
  removeFromFavorite,
} from "@/features/notices/api/noticesApi";

export const addFavoriteThunk = createAsyncThunk(
  "favorites/add",
  async (id, thunkAPI) => {
    try {
      return await addToFavorite(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFavoriteThunk = createAsyncThunk(
  "favorites/remove",
  async (id, thunkAPI) => {
    try {
      return await removeFromFavorite(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    ids: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addFavoriteThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFavoriteThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ids = action.payload;
      })
      .addCase(addFavoriteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeFavoriteThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFavoriteThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ids = action.payload;
      })
      .addCase(removeFavoriteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default favoritesSlice.reducer;