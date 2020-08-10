import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isEmpty } from "lodash/fp";
import io from "socket.io-client";

import messageApi from "api/messageApi";

const socket = io(process.env.REACT_APP_WS_SERVER_URL);

const fetchConverstation = createAsyncThunk(
  "converstation/fetchConverstation",
  async relationshipId => {
    const resp = await messageApi.getConverstation(relationshipId);

    return resp.data;
  }
);

const fetchCreateMessage = createAsyncThunk(
  "converstation/fetchCreateMessage",
  async body => {
    const { relationshipId, message } = body;
    const resp = await messageApi.createMessage(relationshipId, message);

    return resp.data;
  }
);

const messageSlice = createSlice({
  name: "converstation",
  initialState: [],
  reducers: {
    createMessage: (state, action) => {
      const newMsg = action.payload;

      state.push(newMsg);
    },
    clearStore: () => {
      return [];
    }
  },
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
    },
    [fetchCreateMessage.fulfilled]: (state, action) => {
      const data = action.payload;

      socket.emit("createMessage", {
        createdAt: data.createdAt,
        senderId: data.sender_id,
        message: data.message
      });
    }
  }
});

const { actions, reducer } = messageSlice;
export const { createMessage, clearStore } = actions;
export const messageAsync = { fetchConverstation, fetchCreateMessage };

export default reducer;
