import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    title: "Todo1",
    desc: "hello world",
  },
  reducers: {
    update: (state, action) => {
      state.title = action.payload.title;
      state.desc = action.payload.desc;
    },
  },
});

export const { update } = todoSlice.actions;
export default todoSlice.reducer;
