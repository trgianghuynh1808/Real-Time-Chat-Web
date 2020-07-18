import { configureStore } from "@reduxjs/toolkit";

import userSlice from "features/Login/userSlice";
import userProfileSlice from "features/Profile/userProfileSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    userProfile: userProfileSlice,
  },
});

export default store;
