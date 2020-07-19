import React from "react";

import "./style.scss";
import FriendListComponent from "./components/FriendList";
import SearchBar from "./components/SearchBar";
import Images from "constants/images";
import userApi from "api/userApi";

const FRIEND_LIST = [
  {
    name: "Hoàng Thượng",
    statusMsg: "Hn t bùn :(",
    avatar: Images.AVATAR_DEF1,
  },
  {
    name: "Hoàng Thượng",
    statusMsg: "Hn t bùn :(",
    avatar: Images.AVATAR_DEF1,
  },
  {
    name: "Hoàng Thượng",
    statusMsg: "Hn t bùn :(",
    avatar: Images.AVATAR_DEF1,
  },
];

const FriendList = () => {
  const handleSearch = async (addFriendCode) => {
    return await userApi.getUserByFriendCode(addFriendCode);
  };

  return (
    <div className="friend-list">
      <SearchBar handleSearch={handleSearch} />
      <FriendListComponent friendList={FRIEND_LIST} />
    </div>
  );
};

export default FriendList;
