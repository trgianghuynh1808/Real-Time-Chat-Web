import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash/fp";

import "./style.scss";
import InfoUser from "./components/InfoUser";
import ListItemMenu from "./components/ListItemMenu";
import { MENU_ITEM_LIST } from "constants/global";
import userApi from "api/userApi";
import { getCurUser } from "features/Login/userSlice";

const VerticalBar = () => {
  const dispatch = useDispatch();
  const curUser = useSelector((state) => state.user);

  const fetchUpdateStatusCaption = async (statusMsg) => {
    try {
      await userApi.updateStatusCaption(statusMsg);
      return;
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchGetCurrentUser = async () => {
      try {
        if (isEmpty(curUser)) {
          const curUser = await userApi.getCurrentUser();
          dispatch(getCurUser(curUser.data));
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchGetCurrentUser();
  }, [curUser, dispatch]);

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
