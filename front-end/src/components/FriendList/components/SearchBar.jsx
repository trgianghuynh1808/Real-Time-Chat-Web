import React, { useState, useEffect, Fragment } from "react";
import { Emojione } from "react-emoji-render";

import Images from "constants/images";

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

const SearchBar = ({ handleSearch }) => {
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
          <div className="col-8 ml-3 cursor-pointer">
            <div className="font-weight-bold">
              {friend.nick_name || friend.username}
            </div>
            <div className="friend-list__prev-chat">
              <Emojione text={friend.status_caption} />
            </div>
          </div>
          <div className="col-1">
            <i className="fas fa-user-plus friend-list__icon cursor-pointer"></i>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SearchBar;
