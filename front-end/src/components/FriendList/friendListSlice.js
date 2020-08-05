import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import relationshipApi from "api/relationshipApi";

const fetchFriendOfUser = createAsyncThunk(
  "friendList/fetchFriendOfUser",
  async () => {
    const resp = await relationshipApi.getFriendOfUser();
    return resp.data;
  }
);

const friendListSlice = createSlice({
  name: "friendList",
  initialState: {},
  extraReducers: {
    [fetchFriendOfUser.fulfilled]: (state, action) => {
      return action.payload;
    }
  }
});

const { reducer } = friendListSlice;

export const friendListAsync = { fetchFriendOfUser };

export default reducer;
