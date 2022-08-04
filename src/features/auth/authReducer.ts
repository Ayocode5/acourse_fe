import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import User from "../../types/user.type";

// Define a type for the slice state
interface AuthState {
  isLoggedIn: boolean;
  user: User | undefined | void;
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
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

export const { setIsLoggedIn } = authSlice.actions;
export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export default authSlice.reducer;
