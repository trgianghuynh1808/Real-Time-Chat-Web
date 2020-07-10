import React from "react";

const FriendList = ({ friendList }) => {
  return (
    <div className="mt-3">
      {friendList.map((friend, index) => {
        return (
          <div
            className={`row align-items-center friend-list__item ${
              index === 0 && "friend-list__item--active"
            }`}
            key={index}
          >
            <div className="col-2">
              <img
                className="friend-list__avatar-circle"
                src={friend.avatar}
                alt="user-def"
              />
            </div>
            <div className="col-7 ml-3 cursor-pointer">
              <div className="font-weight-bold">{friend.name}</div>
              <div className="friend-list__prev-chat">{friend.statusMsg}</div>
            </div>
            <div className="col-1">
              <i class="fas fa-ellipsis-v friend-list__icon cursor-pointer"></i>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendList;
