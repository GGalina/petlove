import { createAsyncThunk } from "@reduxjs/toolkit";
import { currentUser, logOut } from "@/features/profile/api/userApi";

import {
  setFavorites,
  clearFavorites,
} from "@/store/favoritesSlice";

import {
  setPets,
  clearPets,
} from "@/store/petsSlice";

import {
  setViewed,
  clearViewed,
} from "@/store/viewedSlice";

import { clearAuth } from "@/store/auth/authSlice";

// =========================
// FETCH CURRENT USER
// =========================
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const data = await currentUser();

      // =========================
      // CLEAN + SAFE NORMALIZATION
      // =========================
      const favorites = Array.isArray(data?.noticesFavorites)
        ? data.noticesFavorites.filter(Boolean)
        : [];

      const viewed = Array.isArray(data?.noticesViewed)
        ? data.noticesViewed
        : [];

      const pets = Array.isArray(data?.pets)
        ? data.pets
        : [];

      // =========================
      // DISPATCH CLEAN DATA
      // =========================
      thunkAPI.dispatch(setFavorites(favorites));
      thunkAPI.dispatch(setViewed(viewed));
      thunkAPI.dispatch(setPets(pets));
console.log("API FAVORITES:", data.noticesFavorites);
      return data;
    } catch (error) {
      console.error("fetchCurrentUser error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// =========================
// LOGOUT USER
// =========================
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await logOut();

      thunkAPI.dispatch(clearFavorites());
      thunkAPI.dispatch(clearViewed());
      thunkAPI.dispatch(clearPets());
      thunkAPI.dispatch(clearAuth());

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return true;
    } catch (error) {
      thunkAPI.dispatch(clearFavorites());
      thunkAPI.dispatch(clearViewed());
      thunkAPI.dispatch(clearPets());
      thunkAPI.dispatch(clearAuth());

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);