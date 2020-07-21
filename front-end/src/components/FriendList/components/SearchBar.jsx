import React, { useState, useEffect, Fragment } from "react";
import { Emojione } from "react-emoji-render";

import Images from "constants/images";
import { RELATIONSHIP_STATUS } from "enums";

const { PENDING, ACCEPTED, DECLINED } = RELATIONSHIP_STATUS;

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const renderStatusRelationship = (status, handleClick) => {
  switch (status) {
    case PENDING:
      return (
        <div className="col-4">
          <div className="text-center text-col-gray">Đã gửi</div>
        </div>
      );
    case ACCEPTED:
      return (
        <div className="col-4">
          <div className="text-center text-success">Đã kết bạn</div>
        </div>
      );
    case DECLINED:
      return (
        <div className="col-4">
          <div className="text-center text-danger">Bị từ chối</div>
        </div>
      );
    default:
      return (
        <div className="col-1">
          <i
            className="fas fa-user-plus friend-list__icon cursor-pointer"
            onClick={handleClick}
          ></i>
        </div>
      );
  }
};

const SearchBar = ({ handleSearch, handleAddFriend }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [friend, setFriend] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm)
        .then((result) => {
          setFriend(result.data);
        })
        .catch((err) => {
          return;
        });
    } else {
      setFriend(null);
    }
  }, [debouncedSearchTerm, handleSearch]);

  return (
    <Fragment>
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="form-group friend-list__has-search">
            <span className="fa fa-search form-control-feedback" />
            <input
              type="text"
              className="form-control"
              placeholder="Nhập mã code để kết bạn"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
      </div>

      {friend && (
        <div className="row align-items-center friend-list__item">
          <div className="col-1 position-relative">
            <img
              className="friend-list__avatar-circle"
              src={Images.AVATAR_DEF1}
              alt="user-def"
            />
            <span className="dot dot--online"></span>
          </div>
          <div className="col-6 ml-3 cursor-pointer">
            <div className="font-weight-bold">
              {friend.nick_name || friend.username}
            </div>
            {friend.status_caption && (
              <div className="friend-list__prev-chat">
                <Emojione text={friend.status_caption} />
              </div>
            )}
          </div>

          {renderStatusRelationship(friend.status_relationship, () => {
            handleAddFriend(friend.add_friend_code);
            setSearchTerm("");
          })}
        </div>
      )}
    </Fragment>
  );
};

export default SearchBar;
