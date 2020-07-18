import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    getCurUser(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { getCurUser } = actions;
export default reducer;
