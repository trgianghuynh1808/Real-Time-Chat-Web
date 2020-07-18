import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userApi from "api/userApi";

const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async () => {
    const resp = await userApi.getUserProfile();
    return resp.data;
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {},
  reducers: {
    updateNickName: (state, action) => {
      const newNickName = action.payload;
      state.nick_name = newNickName;

      try {
        userApi.updateNickname(newNickName);
      } catch (error) {
        console.log("error", error);
      }
    },
  },
  extraReducers: {
    [fetchUserProfile.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

const { actions, reducer } = userProfileSlice;
export const { updateNickName } = actions;
export const userProfileAsync = { fetchUserProfile };

export default reducer;
