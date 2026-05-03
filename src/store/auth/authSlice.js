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
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },

    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.error = null;
      state.isLoading = false;

      localStorage.removeItem("token");
    },

    updateUser(state, action) {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;

        const data = action.payload;

        // ✅ keep ONLY user info
        state.user = {
          _id: data._id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          avatar: data.avatar,
        };

        state.token =
          state.token ||
          data?.token ||
          localStorage.getItem("token");
      })

      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.token = null;
        state.user = null;

        localStorage.removeItem("token");
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
        state.user = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setToken, clearAuth, updateUser } = authSlice.actions;
export default authSlice.reducer;