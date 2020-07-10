import React from "react";

import "./style.scss";
import FriendListComponent from "./components/FriendList";
import SearchBar from "./components/SearchBar";
import Images from "constants/images";

const FRIEND_LIST = [
  {
    name: "Giang",
    prevMsg: "Hello",
    avatar: Images.AVATAR_DEF,
  },
  {
    name: "Giang",
    prevMsg: "Hello",
    avatar: Images.AVATAR_DEF,
  },
  {
    name: "Giang",
    prevMsg: "Hello",
    avatar: Images.AVATAR_DEF,
  },
];

const FriendList = () => {
  return (
    <div className="friend-list">
      <SearchBar />
      <FriendListComponent friendList={FRIEND_LIST} />
    </div>
  );
};

export default FriendList;
