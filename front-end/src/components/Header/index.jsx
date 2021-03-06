import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import "./style.scss";
import Main from "./components/Main";
import { formatAMPM } from "utils";
import { removeToken } from "libs/token-libs";
import { clearUserStore } from "features/Login/userSlice";
import { clearUserProfileStore } from "features/Profile/userProfileSlice";
import { relationshipAsync } from "components/Header/friendInvitationsSlice";
import { RELATIONSHIP_STATUS } from "enums";
import { friendListAsync } from "components/FriendList/friendListSlice";
import { clearConverstationStore } from "features/Chat/converstationSlice";
import { clearCurFriendStore } from "components/FriendList/curFriendSlice";

const Header = () => {
  const socket = io(process.env.REACT_APP_WS_SERVER_URL);
  const history = useHistory();
  const dispatch = useDispatch();
  const friendInvitations = useSelector(state => state.friendInvitations);

  const handleLogOut = () => {
    removeToken();
    history.push("/account/login");
    dispatch(clearUserStore());
    dispatch(clearUserProfileStore());
  };

  useEffect(() => {
    dispatch(relationshipAsync.fetchFriendInvitations());
  }, [dispatch]);

  useEffect(() => {
    socket.on("receiveFriendInvitation", () => {
      dispatch(relationshipAsync.fetchFriendInvitations());
    });
  }, [dispatch, socket]);

  const handleAcceptFriendInvitation = async relationshipId => {
    await dispatch(
      relationshipAsync.fetchUpdateStatusRelationship({
        status: RELATIONSHIP_STATUS.ACCEPTED,
        relationshipId
      })
    );

    dispatch(friendListAsync.fetchFriendOfUser());

    return socket.emit("addNewFriend");
  };

  const handleDeclinedFriendInvitation = relationshipId => {
    dispatch(
      relationshipAsync.fetchUpdateStatusRelationship({
        status: RELATIONSHIP_STATUS.DECLINED,
        relationshipId
      })
    );
  };

  const clearStores = () => {
    dispatch(clearConverstationStore());
    dispatch(clearCurFriendStore());
  };

  const handleGoToProfilePage = () => {
    history.push("/profile");
    clearStores();
  };

  const handleGotoChatPage = () => {
    history.push("/chat");
    clearStores();
  };

  return (
    <div className="header">
      <Main
        curDate={formatAMPM()}
        handleLogOut={handleLogOut}
        friendInvitations={friendInvitations}
        handleAcceptFriendInvitation={handleAcceptFriendInvitation}
        handleDeclinedFriendInvitation={handleDeclinedFriendInvitation}
        handleGoToProfilePage={handleGoToProfilePage}
        handleGotoChatPage={handleGotoChatPage}
      />
    </div>
  );
};

export default Header;
