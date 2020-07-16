import React, { useEffect, useState } from "react";

import "./style.scss";
import InfoUser from "./components/InfoUser";
import ListItemMenu from "./components/ListItemMenu";
import { MENU_ITEM_LIST } from "constants/global";
import userApi from "api/userApi";

const VerticalBar = () => {
  const [curUser, setCurUser] = useState(null);

  const fetchGetCurrentUser = async () => {
    try {
      const curUser = await userApi.getCurrentUser();
      setCurUser(curUser.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchUpdateStatusCaption = async (statusMsg) => {
    try {
      await userApi.updateStatusCaption(statusMsg);
      return;
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchGetCurrentUser();
  }, []);

  if (!curUser) return <div>Loading...</div>;

  return (
    <div className="vertical-bar">
      <InfoUser
        fullName={curUser.username}
        statusMsg={curUser.status_caption}
        fetchUpdateStatusCaption={fetchUpdateStatusCaption}
      />
      <ListItemMenu menuItems={MENU_ITEM_LIST} />
    </div>
  );
};

export default VerticalBar;
