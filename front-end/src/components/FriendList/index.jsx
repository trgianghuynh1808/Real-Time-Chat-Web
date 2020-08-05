import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash/fp";

import "./style.scss";
import FriendListComponent from "./components/FriendList";
import SearchBar from "./components/SearchBar";
import Images from "constants/images";
import userApi from "api/userApi";
import relationshipApi from "api/relationshipApi";
import { friendListAsync } from "components/FriendList/friendListSlice";

const FriendList = () => {
  const dispatch = useDispatch();
  const friendList = useSelector(state => state.friendList);

  useEffect(() => {
    dispatch(friendListAsync.fetchFriendOfUser());
  }, [dispatch]);

  const handleSearch = async addFriendCode => {
    return await userApi.getUserByFriendCode(addFriendCode);
  };

  const handleAddFriend = async addFriendCode => {
    return await relationshipApi.addFriend(addFriendCode);
  };

  if (!friendList || isEmpty(friendList)) return <Fragment />;

  console.log("test data", friendList);
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
