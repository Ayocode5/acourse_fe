import { createSlice } from "@reduxjs/toolkit";
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
  },
});

// Other code such as selectors can use the imported `RootState` type

export const { setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
