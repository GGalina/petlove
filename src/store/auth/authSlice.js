import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCurrentUser,
  logoutUser,
} from "./authOperations";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // ✅ set token immediately after login/register
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },

    // ✅ clear all auth data
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.error = null;
      state.isLoading = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder
      // =========================
      // FETCH CURRENT USER
      // =========================
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;

        // ✅ keep existing token OR fallback to backend token
        state.token =
          state.token ||
          action.payload?.token ||
          localStorage.getItem("token");
      })

      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.token = null;
        state.user = null;

        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })

      // =========================
      // LOGOUT
      // =========================
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
        state.user = null;

        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;