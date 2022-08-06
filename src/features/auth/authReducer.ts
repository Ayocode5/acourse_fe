import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import User from "../../types/user.type";

const initialState: User = {
  isLoggedIn: false,
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setIsLoggedIn, setCurrentUser } = authSlice.actions;
export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export default authSlice.reducer;
