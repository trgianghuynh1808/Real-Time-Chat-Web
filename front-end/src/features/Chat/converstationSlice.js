import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isEmpty } from "lodash/fp";

import messageApi from "api/messageApi";

const fetchConverstation = createAsyncThunk(
  "converstation/fetchConverstation",
  async relationshipId => {
    const resp = await messageApi.getConverstation(relationshipId);
    return resp.data;
  }
);

const messageSlice = createSlice({
  name: "converstation",
  initialState: {},
  extraReducers: {
    [fetchConverstation.fulfilled]: (state, action) => {
      const data = action.payload;

      if (isEmpty(data)) return [];

      return data.map(item => {
        return {
          createdAt: item.createdAt,
          senderId: item.sender_id,
          message: item.message
        };
      });
    }
  }
});

const { reducer } = messageSlice;
export const messageAsync = { fetchConverstation };

export default reducer;
