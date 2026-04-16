import { createAsyncThunk } from "@reduxjs/toolkit";
import { currentUser, logOut } from "@/features/profile/api/userApi";

import {
  setFavorites,
  clearFavorites,
} from "@/store/favoritesSlice";

import { clearAuth } from "@/store/auth/authSlice";

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const data = await currentUser();

      // ✅ safe check
      const favorites = data?.noticesFavorites || [];

      // sync favorites to redux
      thunkAPI.dispatch(setFavorites(favorites));

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await logOut();

      // clear ALL client state
      thunkAPI.dispatch(clearFavorites());
      thunkAPI.dispatch(clearAuth());

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);