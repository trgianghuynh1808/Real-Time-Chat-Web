import { configureStore } from "@reduxjs/toolkit";

import userSlice from "features/Login/userSlice";
import userProfileSlice from "features/Profile/userProfileSlice";
import friendInvitationsSlice from "components/Header/friendInvitationsSlice";
import friendListSlice from "components/FriendList/friendListSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    userProfile: userProfileSlice,
    friendInvitations: friendInvitationsSlice,
    friendList: friendListSlice
  }
});

export default store;
