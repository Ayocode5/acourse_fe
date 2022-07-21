import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    refreshToken: null,
  },

  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logOut: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
