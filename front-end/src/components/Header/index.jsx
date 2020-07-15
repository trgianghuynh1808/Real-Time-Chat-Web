import React from "react";
import { useHistory } from "react-router-dom";

import "./style.scss";
import Main from "./components/Main";
import { formatAMPM } from "utils";
import { removeToken } from "libs/token-libs";

const Header = () => {
  const history = useHistory();

  const handleLogOut = () => {
    removeToken();
    history.push("/account/login");
  };

  return (
    <div className="header">
      <Main curDate={formatAMPM()} handleLogOut={handleLogOut} />
    </div>
  );
};

export default Header;
