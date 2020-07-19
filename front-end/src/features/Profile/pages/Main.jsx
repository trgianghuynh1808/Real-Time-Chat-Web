import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileInfo from "../components/ProfileInfo";
import { userProfileAsync, updateNickName } from "../userProfileSlice";
import { updateNickNameUser } from "features/Login/userSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const curUserProfile = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(userProfileAsync.fetchUserProfile());
  }, [dispatch]);

  const handleUpdateNickName = (newNickName) => {
    dispatch(updateNickName(newNickName));
    dispatch(updateNickNameUser(newNickName));
  };

  const handleChangePassword = (newPassword) => {
    dispatch(userProfileAsync.fetchChangePassword(newPassword));
  };

  return (
    <div>
      <ProfileInfo
        userProfile={curUserProfile}
        handleUpdateNickName={handleUpdateNickName}
        handleChangePassword={handleChangePassword}
      />
    </div>
  );
};

export default MainPage;
