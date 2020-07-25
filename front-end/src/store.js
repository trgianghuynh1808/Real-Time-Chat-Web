import { configureStore } from "@reduxjs/toolkit";

import userSlice from "features/Login/userSlice";
import userProfileSlice from "features/Profile/userProfileSlice";
import friendInvitationsSlice from "components/Header/friendInvitationsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    userProfile: userProfileSlice,
    friendInvitations: friendInvitationsSlice,
  },
});

export default store;
