import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import "./style.scss";
import FriendListComponent from "./components/FriendList";
import SearchBar from "./components/SearchBar";
import userApi from "api/userApi";
import relationshipApi from "api/relationshipApi";
import { friendListAsync } from "components/FriendList/friendListSlice";
import { showInfoToast } from "libs/toast-libs";

const FriendList = () => {
  const socket = io(process.env.REACT_APP_WS_SERVER_URL);
  const dispatch = useDispatch();
  const friendList = useSelector(state => state.friendList);

  useEffect(() => {
    dispatch(friendListAsync.fetchFriendOfUser());
  }, [dispatch]);

  useEffect(() => {
    socket.on("addNewFriend", () => {
      dispatch(friendListAsync.fetchFriendOfUser());
      showInfoToast("Bạn đã có thêm bạn mới ^^");
    });
  }, [socket, dispatch]);

  const handleSearch = async addFriendCode => {
    return await userApi.getUserByFriendCode(addFriendCode);
  };

  const handleAddFriend = async addFriendCode => {
    await relationshipApi.addFriend(addFriendCode);

    return socket.emit("sendFriendInvitation");
  };

  return (
    <div className="friend-list">
      <SearchBar
        handleSearch={handleSearch}
        handleAddFriend={handleAddFriend}
      />
      <FriendListComponent friendList={friendList} />
    </div>
  );
};

export default FriendList;
