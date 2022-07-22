/* eslint-disable camelcase */
import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
  return localStorage.getItem("authToken")
    ? JSON.parse(localStorage.getItem("authToken"))
    : { access_token: null, refresh_token: null };
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState(),
  reducers: {
    setCredentials: (state, action) => {
      state = { ...state, ...action.payload };
    },
    logOut: (state) => {
      // eslint-disable-next-line no-unused-expressions
      localStorage.getItem("authToken")
        ? localStorage.removeItem("authToken")
        : null;
      state.access_token = null;
      state.refresh_token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
