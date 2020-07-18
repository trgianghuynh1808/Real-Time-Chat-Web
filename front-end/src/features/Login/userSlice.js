import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userApi from "api/userApi";

const fetchCurUser = createAsyncThunk("user/fetchCurUser", async () => {
  const resp = await userApi.getCurrentUser();
  return resp.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    updateStatusCaption: (state, action) => {
      const newStatusCaption = action.payload;
      state.status_caption = newStatusCaption;

      try {
        userApi.updateStatusCaption(newStatusCaption);
      } catch (error) {
        console.log("error", error);
      }
    },
    updateNickNameUser: (state, action) => {
      const newNickName = action.payload;
      state.nick_name = newNickName;
    },
    clearUserStore: () => {
      return {};
    },
  },
  extraReducers: {
    [fetchCurUser.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const {
  updateStatusCaption,
  clearUserStore,
  updateNickNameUser,
} = actions;
export const userAsync = { fetchCurUser };

export default reducer;
