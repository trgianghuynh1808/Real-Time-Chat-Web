import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.scss";
import Main from "./components/Main";
import { formatAMPM } from "utils";
import { removeToken } from "libs/token-libs";
import { clearUserStore } from "features/Login/userSlice";
import { clearUserProfileStore } from "features/Profile/userProfileSlice";
import { relationshipAsync } from "components/Header/friendInvitationsSlice";
import { RELATIONSHIP_STATUS } from "enums";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const friendInvitations = useSelector((state) => state.friendInvitations);

  const handleLogOut = () => {
    removeToken();
    history.push("/account/login");
    dispatch(clearUserStore());
    dispatch(clearUserProfileStore());
  };

  useEffect(() => {
    dispatch(relationshipAsync.fetchFriendInvitations());
  }, [dispatch]);

  const handleAcceptFriendInvitation = (relationshipId) => {
    dispatch(
      relationshipAsync.fetchUpdateStatusRelationship({
        status: RELATIONSHIP_STATUS.ACCEPTED,
        relationshipId,
      })
    );
  };

  const handleDeclinedFriendInvitation = (relationshipId) => {
    dispatch(
      relationshipAsync.fetchUpdateStatusRelationship({
        status: RELATIONSHIP_STATUS.DECLINED,
        relationshipId,
      })
    );
  };

  return (
    <div className="header">
      <Main
        curDate={formatAMPM()}
        handleLogOut={handleLogOut}
        friendInvitations={friendInvitations}
        handleAcceptFriendInvitation={handleAcceptFriendInvitation}
        handleDeclinedFriendInvitation={handleDeclinedFriendInvitation}
      />
    </div>
  );
};

export default Header;
