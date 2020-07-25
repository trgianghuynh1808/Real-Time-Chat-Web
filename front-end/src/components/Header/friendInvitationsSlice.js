import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isEmpty } from "lodash/fp";

import relationshipApi from "api/relationshipApi";

const fetchFriendInvitations = createAsyncThunk(
  "friendInvitations/fetchFriendInvitations",
  async () => {
    const resp = await relationshipApi.getFriendInvitations();
    return resp.data;
  }
);

const fetchUpdateStatusRelationship = createAsyncThunk(
  "friendInvitations/fetchUpdateStatusRelationship",
  async (body) => {
    const { status, relationshipId } = body;

    const resp = await relationshipApi.updateStatusRelationship(
      status,
      relationshipId
    );
    return resp.data;
  }
);

const friendInvitationsSlice = createSlice({
  name: "friendInvitations",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchFriendInvitations.fulfilled]: (state, action) => {
      const data = action.payload;

      if (isEmpty(data)) return [];

      return data.map((item) => {
        const {
          id: relationshipId,
          action_user_id: actionUserId,
          user_one_id: userOne,
          user_two_id: userTwo,
        } = item;

        if (userOne.id === actionUserId) {
          return {
            ...userOne,
            relationshipId,
          };
        }

        return { ...userTwo, relationshipId };
      });
    },
    [fetchUpdateStatusRelationship.fulfilled]: (state, action) => {
      const relationshipUpdated = action.payload;
      const relationships = state;

      return relationships.filter(
        (relationship) => relationship.relationshipId !== relationshipUpdated.id
      );
    },
  },
});

const { actions, reducer } = friendInvitationsSlice;
export const relationshipAsync = {
  fetchFriendInvitations,
  fetchUpdateStatusRelationship,
};

export default reducer;
