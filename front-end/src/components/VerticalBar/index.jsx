import React from "react";

import "./style.scss";
import InfoUser from "./components/InfoUser";
import ListItemMenu from "./components/ListItemMenu";
import { MENU_ITEM_LIST } from "constants/global";

const VerticalBar = () => {
  return (
    <div className="vertical-bar">
      <InfoUser fullName={"Giang Huynh"} statusMsg="Hn t ..." />
      <ListItemMenu menuItems={MENU_ITEM_LIST} />
    </div>
  );
};

export default VerticalBar;
