import React from "react";

import "./style.scss";
import Main from "./components/Main";
import { formatAMPM } from "utils";

const Header = () => {
  return (
    <div className="header">
      <Main curDate={formatAMPM()} />
    </div>
  );
};

export default Header;
