import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUser, logoutUser } from "./authOperations";

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
    // =========================
    // SET TOKEN
    // =========================
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },

    // =========================
    // CLEAR AUTH
    // =========================
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.error = null;
      state.isLoading = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    // =========================
    // UPDATE USER (includes pets updates)
    // =========================
    updateUser(state, action) {
      state.user = action.payload;

      // optional persistence
      localStorage.setItem("user", JSON.stringify(action.payload));
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

        state.token =
          state.token ||
          action.payload?.token ||
          localStorage.getItem("token");

        // optional persistence
        localStorage.setItem("user", JSON.stringify(action.payload));
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

export const { setToken, clearAuth, updateUser } = authSlice.actions;
export default authSlice.reducer;