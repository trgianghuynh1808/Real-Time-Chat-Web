import React from "react";
import { Emojione } from "react-emoji-render";
import { isEmpty } from "lodash/fp";
import { NavLink } from "react-router-dom";

import Images from "constants/images";

const FriendListMobile = ({
  friendList,
  handleSelectConverstation,
  curFriend
}) => {
  if (!friendList || isEmpty(friendList)) {
    return <div className="mt-3 text-center"> Hãy kiếm thêm bạn bè!</div>;
  }

  return (
    <div className="container mt-3">
      <div className="row">
        {friendList.map((friend, index) => {
          const { nick_name: nickName, status_caption: statusCaption } = friend;
          return (
            <NavLink
              key={index}
              to={"/chat"}
              className="text-decoration-none text-dark col-12 friend-item"
            >
              <div
                className={`row align-items-center justify-content-center friend-list__item ${curFriend.id ===
                  friend.id && "friend-list__item--active"} cursor-pointer`}
                key={index}
                onClick={() => handleSelectConverstation(friend.id)}
              >
                <div className="col2- position-relative">
                  <img
                    className="friend-list__avatar-circle"
                    src={friend.avatar || Images.AVATAR_DEF1}
                    alt="user-def"
                  />
                  <span className="dot dot--online"></span>
                </div>
                <div className="col-9 ml-3 cursor-pointer">
                  <div className="font-weight-bold">
                    {nickName || friend.username}
                  </div>
                  {statusCaption && (
                    <div className="friend-list__prev-chat">
                      <Emojione text={statusCaption} />{" "}
                    </div>
                  )}
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default FriendListMobile;
