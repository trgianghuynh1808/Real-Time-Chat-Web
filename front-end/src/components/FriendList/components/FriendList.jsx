import React from "react";
import { Emojione } from "react-emoji-render";
import { isEmpty } from "lodash/fp";

import Images from "constants/images";

const FriendList = ({ friendList }) => {
  if (!friendList || isEmpty(friendList)) {
    return <div className="mt-3 text-center"> Hãy kiếm thêm bạn bè!</div>;
  }

  return (
    <div className="mt-3">
      {friendList.map((friend, index) => {
        const { nick_name: nickName, status_caption: statusCaption } = friend;
        return (
          <div
            className={`row align-items-center friend-list__item ${index ===
              0 && "friend-list__item--active"}`}
            key={index}
          >
            <div className="col-1 position-relative">
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
        );
      })}
    </div>
  );
};

export default FriendList;
