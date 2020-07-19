import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./style.scss";
import Main from "./components/Main";
import { formatAMPM } from "utils";
import { removeToken } from "libs/token-libs";
import { clearUserStore } from "features/Login/userSlice";
import { clearUserProfileStore } from "features/Profile/userProfileSlice";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    removeToken();
    history.push("/account/login");
    dispatch(clearUserStore());
    dispatch(clearUserProfileStore());
  };

  return (
    <div className="header">
      <Main curDate={formatAMPM()} handleLogOut={handleLogOut} />
    </div>
  );
};

export default Header;
