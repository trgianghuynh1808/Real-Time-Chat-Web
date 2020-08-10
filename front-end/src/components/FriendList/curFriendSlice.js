import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "api/userApi";

const fetchUserOfConverstation = createAsyncThunk(
  "curFriend/fetchUserOfConverstation",
  async userId => {
    const resp = await userApi.getUserOfConverstation(userId);

    return resp.data;
  }
);

const curFriendSlice = createSlice({
  name: "curFriend",
  initialState: {},
  extraReducers: {
    [fetchUserOfConverstation.fulfilled]: (state, action) => {
      return action.payload;
    }
  }
});

const { reducer } = curFriendSlice;

export const curFriendAsync = { fetchUserOfConverstation };

export default reducer;
